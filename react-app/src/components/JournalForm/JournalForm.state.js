export const INITIAL_STATE = {
    isValid: {
        title: true,
        post: true,
        date: true,
    },
    values: {
        title: undefined,
        post: undefined,
        date: undefined,
    },
    isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
    switch (action.type) {
        case "RESET_VALIDITY":
            return { ...state, isValid: INITIAL_STATE.isValid };
        case "SUBMIT": {
            const titleValidity = action.payload.title?.trim();
            const postValidity = action.payload.post?.trim();
            const dateValidity = action.payload.date;
            return {
                values: action.payload,
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
