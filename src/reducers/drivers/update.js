import {UPDATE_DRIVER_ERROR, UPDATE_DRIVER_LOADING, UPDATE_DRIVER_SUCCESS, UPDATE_DRIVER_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateDriverReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_DRIVER_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case UPDATE_DRIVER_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case UPDATE_DRIVER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateDriverReducer;
