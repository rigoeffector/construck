import {CREATE_INTERNAL_ASSET_ERROR, CREATE_INTERNAL_ASSET_LOADING, CREATE_INTERNAL_ASSET_SUCCESS, CREATE_INTERNAL_ASSET_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const createInternalAssetReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_INTERNAL_ASSET_LOADING:
            return {...state, loading: payload.loading};
        case CREATE_INTERNAL_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.result,
                message: payload.message
            };
        case CREATE_INTERNAL_ASSET_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case CREATE_INTERNAL_ASSET_RESET:
            return initialState;
        default:
            return state;
    }
};

export default createInternalAssetReducer;
