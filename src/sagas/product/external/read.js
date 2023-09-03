/* eslint-disable no-unused-vars */
import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {
    GET_EXTERNAL_ASSETS_LIST_LOADING,
    GET_EXTERNAL_ASSETS_LIST_ERROR,
    GET_EXTERNAL_ASSETS_LIST_RESET,
    GET_EXTERNAL_ASSETS_LIST_REQUEST,
    GET_EXTERNAL_ASSETS_LIST_SUCCESS
} from '../../../reducers/product/external/constant';
import {productApi} from '../../../api/product';

export function* listExternallAssetsRequestSaga(action) {
    try {
        yield put(loading(GET_EXTERNAL_ASSETS_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.externalAssets.listExternal);
        if (response && response.status === 201) {
            yield put(success(GET_EXTERNAL_ASSETS_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_EXTERNAL_ASSETS_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_EXTERNAL_ASSETS_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_EXTERNAL_ASSETS_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_EXTERNAL_ASSETS_LIST_RESET});
    }
}

export function* watchExternalAssetsListData() {
    yield takeLatest(GET_EXTERNAL_ASSETS_LIST_REQUEST, listExternallAssetsRequestSaga);
}
