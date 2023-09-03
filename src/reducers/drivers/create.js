import {CREATE_DRIVER_ERROR, CREATE_DRIVER_LOADING, CREATE_DRIVER_SUCCESS, CREATE_DRIVER_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createDriverReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_DRIVER_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_DRIVER_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_DRIVER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createDriverReducer;
