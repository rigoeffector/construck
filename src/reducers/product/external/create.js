import {CREATE_EXTERNAL_ASSET_ERROR, CREATE_EXTERNAL_ASSET_LOADING, CREATE_EXTERNAL_ASSET_SUCCESS, CREATE_EXTERNAL_ASSET_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createExternalAssetReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_EXTERNAL_ASSET_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_EXTERNAL_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case CREATE_EXTERNAL_ASSET_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_EXTERNAL_ASSET_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createExternalAssetReducer;
