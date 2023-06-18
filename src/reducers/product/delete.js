import {DELETE_PRODUCT_ERROR, DELETE_PRODUCT_LOADING, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const deleteProductReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DELETE_PRODUCT_LOADING:
            return {...state, loading: payload.loading};
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case DELETE_PRODUCT_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case DELETE_PRODUCT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default deleteProductReducer;
