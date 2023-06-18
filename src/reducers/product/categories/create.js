import {
    CREATE_PRODUCT_CATEGORY_ERROR,
    CREATE_PRODUCT_CATEGORY_LOADING,
    CREATE_PRODUCT_CATEGORY_SUCCESS,
    CREATE_PRODUCT_CATEGORY_RESET
} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createProductCategoryReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_PRODUCT_CATEGORY_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case CREATE_PRODUCT_CATEGORY_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case CREATE_PRODUCT_CATEGORY_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createProductCategoryReducer;
