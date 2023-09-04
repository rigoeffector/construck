/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_ALL_TYPES_LIST_LOADING,
    GET_ALL_TYPES_LIST_ERROR,
    GET_ALL_TYPES_LIST_RESET,
    GET_ALL_TYPES_LIST_REQUEST,
    GET_ALL_TYPES_LIST_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';

export function* listTypesAssetsRequestSaga(action) {
    try {
        yield put(loading(GET_ALL_TYPES_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.viewAssetTypes);
        if (response && response.status === 201) {
            yield put(success(GET_ALL_TYPES_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_ALL_TYPES_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_ALL_TYPES_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_ALL_TYPES_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_ALL_TYPES_LIST_RESET});
    }
}

export function* watchAssetsTypesListData() {
    yield takeLatest(GET_ALL_TYPES_LIST_REQUEST, listTypesAssetsRequestSaga);
}
