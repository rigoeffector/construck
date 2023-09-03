import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_INTERNAL_ASSETS_LIST_LOADING,
    GET_INTERNAL_ASSETS_LIST_ERROR,
    GET_INTERNAL_ASSETS_LIST_RESET,
    GET_INTERNAL_ASSETS_LIST_REQUEST,
    GET_INTERNAL_ASSETS_LIST_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';

export function* listInternalAssetsRequestSaga(action) {
    try {
        yield put(loading(GET_INTERNAL_ASSETS_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.listInternal, {...payload});
        if (response && response.status === 201) {
            yield put(success(GET_INTERNAL_ASSETS_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_INTERNAL_ASSETS_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_INTERNAL_ASSETS_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_INTERNAL_ASSETS_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_INTERNAL_ASSETS_LIST_RESET});
    }
}

export function* watchInternalAssetsListData() {
    yield takeLatest(GET_INTERNAL_ASSETS_LIST_REQUEST, listInternalAssetsRequestSaga);
}
