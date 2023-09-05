/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    VIEW_ALL_REQUESTS_ASSETS_LOADING,
    VIEW_ALL_REQUESTS_ASSETS_ERROR,
    VIEW_ALL_REQUESTS_ASSETS_RESET,
    VIEW_ALL_REQUESTS_ASSETS_REQUEST,
    VIEW_ALL_REQUESTS_ASSETS_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';

export function* listRequestedAssetsRequestSaga(action) {
    try {
        yield put(loading(VIEW_ALL_REQUESTS_ASSETS_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.viewRequests,{...payload});
        if (response && response.status === 201) {
            yield put(success(VIEW_ALL_REQUESTS_ASSETS_SUCCESS, response));
        } else {
            yield put(error(VIEW_ALL_REQUESTS_ASSETS_ERROR, response));
            yield delay(2000);
            yield put({type: VIEW_ALL_REQUESTS_ASSETS_RESET});
        }
    } catch (err) {
        yield put(error(VIEW_ALL_REQUESTS_ASSETS_ERROR, err));
        yield delay(2000);
        yield put({type: VIEW_ALL_REQUESTS_ASSETS_RESET});
    }
}

export function* watchRequestedAssetsData() {
    yield takeLatest(VIEW_ALL_REQUESTS_ASSETS_REQUEST, listRequestedAssetsRequestSaga);
}
