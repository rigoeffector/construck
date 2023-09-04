import {CREATE_INVOICE_ERROR, CREATE_INVOICE_LOADING, CREATE_INVOICE_SUCCESS, CREATE_INVOICE_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createInvoiceReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_INVOICE_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case CREATE_INVOICE_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_INVOICE_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createInvoiceReducer;
