import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();
    const { userId } = useContext(UserContext);

    const focusEror = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.post:
                postRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        if (!data) {
            dispatchForm({ type: "CLEAR" });
            dispatchForm({ type: "SET_VALUE", payload: { userId } });
        }
        dispatchForm({ type: "SET_VALUE", payload: { ...data } });
    }, [data]);

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.post || !isValid.title) {
            focusEror(isValid);
            timerId = setTimeout(() => {
                dispatchForm({ type: "RESET_VALIDITY" });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({ type: "CLEAR" });
            dispatchForm({ type: "SET_VALUE", payload: { userId } });
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }, [userId]);

    const onChange = (e) => {
        dispatchForm({ type: "SET_VALUE", payload: { [e.target.name]: e.target.value } });
    };

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({ type: "SUBMIT" });
    };

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: "CLEAR" });
        dispatchForm({ type: "SET_VALUE", payload: { userId } });
    };

    return (
        <form className={styles["journal-form"]} onSubmit={addJournalItem}>
            <div className={styles["form-row"]}>
                <Input type="text" name="title" ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} appearence="title" />
                {data?.id && (
                    <button className={styles["delete"]} type="button" onClick={() => deleteJournalItem()}>
                        <img src="archive.svg" alt="Кнопка удалить" />
                    </button>
                )}
            </div>
            <div className={styles["form-row"]}>
                <label htmlFor="date" className={styles["form-label"]}>
                    <img src="/calendar.svg" alt="Иконка календаря" />
                    <span>Дата</span>
                </label>
                <Input type="date" name="date" ref={dateRef} isValid={isValid.date} onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ""} id="date" />
            </div>
            <div className={styles["form-row"]}>
                <label htmlFor="tag" className={styles["form-label"]}>
                    <img src="/folder.svg" alt="Иконка папки" />
                    <span>Метки</span>
                </label>
                <Input type="text" value={values.tag} onChange={onChange} id="tag" name="tag" />
            </div>

            <textarea
                name="post"
                ref={postRef}
                onChange={onChange}
                value={values.post}
                id=""
                cols="30"
                rows="10"
                className={cn(styles["input"], {
                    [styles["invalid"]]: !isValid.post,
                })}
            ></textarea>
            <Button text="Сохранить" />
        </form>
    );
}

export default JournalForm;
