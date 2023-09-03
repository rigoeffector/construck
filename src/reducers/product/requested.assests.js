import {VIEW_ALL_REQUESTS_ASSETS_ERROR, VIEW_ALL_REQUESTS_ASSETS_LOADING, VIEW_ALL_REQUESTS_ASSETS_SUCCESS, VIEW_ALL_REQUESTS_ASSETS_RESET} from './constant';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const readRequestedAssetsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case VIEW_ALL_REQUESTS_ASSETS_LOADING:
            return {...state, loading: payload.loading};
        case VIEW_ALL_REQUESTS_ASSETS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data,
                message: payload.message
            };
        case VIEW_ALL_REQUESTS_ASSETS_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case VIEW_ALL_REQUESTS_ASSETS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default readRequestedAssetsReducer;
