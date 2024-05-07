import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();

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
        }
    }, [isFormReadyToSubmit, values, onSubmit]);

    const onChange = (e) => {
        dispatchForm({ type: "SET_VALUE", payload: { [e.target.name]: e.target.value } });
    };

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({ type: "SUBMIT" });
    };

    return (
        <form className={styles["journal-form"]} onSubmit={addJournalItem}>
            <div>
                <input
                    type="text"
                    name="title"
                    ref={titleRef}
                    onChange={onChange}
                    value={values.title}
                    className={cn(styles["input-title"], {
                        [styles["invalid"]]: !isValid.title,
                    })}
                />
            </div>
            <div className={styles["form-row"]}>
                <label htmlFor="date" className={styles["form-label"]}>
                    <img src="/calendar.svg" alt="Иконка календаря" />
                    <span>Дата</span>
                </label>
                <input
                    type="date"
                    name="date"
                    ref={dateRef}
                    onChange={onChange}
                    value={values.date}
                    id="date"
                    className={cn(styles["input"], {
                        [styles["invalid"]]: !isValid.date,
                    })}
                />
            </div>
            <div className={styles["form-row"]}>
                <label htmlFor="tag" className={styles["form-label"]}>
                    <img src="/folder.svg" alt="Иконка папки" />
                    <span>Метки</span>
                </label>
                <input type="text" value={values.tag} onChange={onChange} id="tag" name="tag" className={styles["input"]} />
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
