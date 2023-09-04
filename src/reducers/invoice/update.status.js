import {
    UPDATE_INVOICE_STATUS_ERROR,
    UPDATE_INVOICE_STATUS_LOADING,
    UPDATE_INVOICE_STATUS_SUCCESS,
    UPDATE_INVOICE_STATUS_RESET
} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateInvoiceStatusReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_INVOICE_STATUS_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_INVOICE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case UPDATE_INVOICE_STATUS_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case UPDATE_INVOICE_STATUS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateInvoiceStatusReducer;
