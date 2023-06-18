import {DELETE_VENDOR_ERROR, DELETE_VENDOR_LOADING, DELETE_VENDOR_SUCCESS, DELETE_VENDOR_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const deleteVendorReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DELETE_VENDOR_LOADING:
            return {...state, loading: payload.loading};
        case DELETE_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case DELETE_VENDOR_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case DELETE_VENDOR_RESET:
            return initialState;
        default:
            return state;
    }
};

export default deleteVendorReducer;
