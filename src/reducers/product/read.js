import {GET_INTERNAL_ASSETS_LIST_ERROR, GET_INTERNAL_ASSETS_LIST_LOADING, GET_INTERNAL_ASSETS_LIST_SUCCESS, GET_INTERNAL_ASSETS_LIST_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const readInternalAssetsListReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_INTERNAL_ASSETS_LIST_LOADING:
            return {...state, loading: payload.loading};
        case GET_INTERNAL_ASSETS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case GET_INTERNAL_ASSETS_LIST_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_INTERNAL_ASSETS_LIST_RESET:
            return initialState;
        default:
            return state;
    }
};

export default readInternalAssetsListReducer;
