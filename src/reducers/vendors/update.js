import {UPDATE_VENDOR_ERROR, UPDATE_VENDOR_LOADING, UPDATE_VENDOR_SUCCESS, UPDATE_VENDOR_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateVendorReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_VENDOR_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_VENDOR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case UPDATE_VENDOR_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case UPDATE_VENDOR_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateVendorReducer;
