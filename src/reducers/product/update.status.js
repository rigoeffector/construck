import {
    UPDATE_INTERNAL_ASSET_STATUS_ERROR,
    UPDATE_INTERNAL_ASSET_STATUS_LOADING,
    UPDATE_INTERNAL_ASSET_STATUS_SUCCESS,
    UPDATE_INTERNAL_ASSET_STATUS_RESET
} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const updateInternalAssetStatusReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_INTERNAL_ASSET_STATUS_LOADING:
            return {...state, loading: payload.loading};
        case UPDATE_INTERNAL_ASSET_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case UPDATE_INTERNAL_ASSET_STATUS_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case UPDATE_INTERNAL_ASSET_STATUS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default updateInternalAssetStatusReducer;
