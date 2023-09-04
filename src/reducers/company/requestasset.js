import {COMPANY_REQUEST_ASSET_ERROR, COMPANY_REQUEST_ASSET_LOADING, COMPANY_REQUEST_ASSET_SUCCESS, COMPANY_REQUEST_ASSET_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const companyRequestAssetReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case COMPANY_REQUEST_ASSET_LOADING:
            return {...state, loading: payload.loading};
        case COMPANY_REQUEST_ASSET_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case COMPANY_REQUEST_ASSET_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case COMPANY_REQUEST_ASSET_RESET:
            return initialState;
        default:
            return state;
    }
};

export default companyRequestAssetReducer;
