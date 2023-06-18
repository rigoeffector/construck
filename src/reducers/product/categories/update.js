import {
    UPDATE_PRODUCT_CATEGORY_ERROR,
    UPDATE_PRODUCT_CATEGORY_LOADING,
    UPDATE_PRODUCT_CATEGORY_SUCCESS,
    UPDATE_PRODUCT_CATEGORY_RESET
} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateProductCategoryReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_PRODUCT_CATEGORY_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case UPDATE_PRODUCT_CATEGORY_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case UPDATE_PRODUCT_CATEGORY_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateProductCategoryReducer;
