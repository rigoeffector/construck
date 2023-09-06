import {
    GET_STATS_LIST_ERROR,
    GET_STATS_LIST_LOADING,
    GET_STATS_LIST_SUCCESS,
    GET_STATS_LIST_RESET,
} from './constants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    message: null
};

const getStatisticsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_STATS_LIST_LOADING:
            return {...state, loading: payload.loading};
        case GET_STATS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                data: payload.data
            };
        case GET_STATS_LIST_ERROR:
            return {...state, loading: false, error: payload.error, message: payload.message};
        case GET_STATS_LIST_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getStatisticsReducer;
