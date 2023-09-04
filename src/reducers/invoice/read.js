import {GET_INVOICES_LIST_ERROR, GET_INVOICES_LIST_LOADING, GET_INVOICES_LIST_SUCCESS, GET_INVOICES_LIST_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const getInvoicesListReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_INVOICES_LIST_LOADING:
            return {...state, loading: payload.loading};
        case GET_INVOICES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case GET_INVOICES_LIST_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_INVOICES_LIST_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getInvoicesListReducer;
