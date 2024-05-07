export const INITIAL_STATE = {
    isValid: {
        title: true,
        post: true,
        date: true,
    },
    values: {
        title: "",
        post: "",
        date: "",
        tag: "",
    },
    isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
    switch (action.type) {
        case "SET_VALUE":
            return { ...state, values: { ...state.values, ...action.payload } };
        case "CLEAR":
            return { ...state, values: INITIAL_STATE.values };
        case "RESET_VALIDITY":
            return { ...state, isValid: INITIAL_STATE.isValid };
        case "SUBMIT": {
            const titleValidity = state.values.title?.trim();
            const postValidity = state.values.post?.trim();
            const dateValidity = state.values.date;
            return {
                ...state,
                isValid: {
                    title: titleValidity,
                    post: postValidity,
                    date: dateValidity,
                },
                isFormReadyToSubmit: titleValidity && postValidity && dateValidity,
            };
        }
    }
}
