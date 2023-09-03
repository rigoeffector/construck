import {DELETE_DRIVER_ERROR, DELETE_DRIVER_LOADING, DELETE_DRIVER_SUCCESS, DELETE_DRIVER_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const deleteDriverReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DELETE_DRIVER_LOADING:
            return {...state, loading: payload.loading};
        case DELETE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case DELETE_DRIVER_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case DELETE_DRIVER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default deleteDriverReducer;
