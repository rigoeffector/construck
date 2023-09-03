import {DELETE_EXTERNAL_ASSET_ERROR, DELETE_EXTERNAL_ASSET_LOADING, DELETE_EXTERNAL_ASSET_SUCCESS, DELETE_EXTERNAL_ASSET_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const deleteEternalAssetReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DELETE_EXTERNAL_ASSET_LOADING:
            return {...state, loading: payload.loading};
        case DELETE_EXTERNAL_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case DELETE_EXTERNAL_ASSET_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case DELETE_EXTERNAL_ASSET_RESET:
            return initialState;
        default:
            return state;
    }
};

export default deleteEternalAssetReducer;
