import {
    GET_VENDORS_LIST_ERROR,
    GET_VENDORS_LIST_LOADING,
    GET_VENDORS_LIST_SUCCESS,
    GET_VENDORS_LIST_RESET,
} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const getVendorsListReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_VENDORS_LIST_LOADING:
            return {...state, loading: payload.loading};
        case GET_VENDORS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result
            };
        case GET_VENDORS_LIST_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case GET_VENDORS_LIST_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getVendorsListReducer;
