import {CREATE_VENDOR_ERROR, CREATE_VENDOR_LOADING, CREATE_VENDOR_SUCCESS, CREATE_VENDOR_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createVendorReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_VENDOR_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case CREATE_VENDOR_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case CREATE_VENDOR_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createVendorReducer;
