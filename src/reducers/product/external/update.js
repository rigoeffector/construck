import {UPDATE_INTERNAL_ASSET_STATUS_ERROR, UPDATE_INTERNAL_ASSET_STATUS_LOADING, UPDATE_INTERNAL_ASSET_STATUS_SUCCESS, UPDATE_INTERNAL_ASSET_STATUS_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateProductReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_INTERNAL_ASSET_STATUS_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_INTERNAL_ASSET_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: payload.success,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case UPDATE_INTERNAL_ASSET_STATUS_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.error_message};
        case UPDATE_INTERNAL_ASSET_STATUS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateProductReducer;
