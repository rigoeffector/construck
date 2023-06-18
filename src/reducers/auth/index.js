import {LOGIN_USER_ERROR, LOGIN_USER_LOADING, LOGIN_USER_SUCCESS, LOGIN_USER_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const loginUserReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOGIN_USER_LOADING:
            return {...state, loading: payload.loading};
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result
            };
        case LOGIN_USER_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case LOGIN_USER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default loginUserReducer;
