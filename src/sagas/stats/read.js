/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {productApi} from '../../api/product';
import {
    GET_STATS_LIST_SUCCESS,
    GET_STATS_LIST_LOADING,
    GET_STATS_LIST_ERROR,
    GET_STATS_LIST_RESET,
    GET_STATS_LIST_REQUEST
} from '../../reducers/stats/constants';

export function* listStatsRequestSaga(action) {
    try {
        yield put(loading(GET_STATS_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.stats.list);
        if (response && response.status === 201) {
            yield put(success(GET_STATS_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_STATS_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_STATS_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_STATS_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_STATS_LIST_RESET});
    }
}

export function* watchStatsListData() {
    yield takeLatest(GET_STATS_LIST_REQUEST, listStatsRequestSaga);
}
