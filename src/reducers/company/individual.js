import {INDIVIDUAL_REQUEST_ASSET_ERROR, INDIVIDUAL_REQUEST_ASSET_LOADING, INDIVIDUAL_REQUEST_ASSET_SUCCESS, INDIVIDUAL_REQUEST_ASSET_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const individualRequestAssetReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case INDIVIDUAL_REQUEST_ASSET_LOADING:
            return {...state, loading: payload.loading};
        case INDIVIDUAL_REQUEST_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case INDIVIDUAL_REQUEST_ASSET_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case INDIVIDUAL_REQUEST_ASSET_RESET:
            return initialState;
        default:
            return state;
    }
};

export default individualRequestAssetReducer;
