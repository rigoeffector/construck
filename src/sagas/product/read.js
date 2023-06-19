import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_PRODUCTS_LIST_LOADING,
    GET_PRODUCTS_LIST_ERROR,
    GET_PRODUCTS_LIST_RESET,
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';

export function* listProductRequestSaga(action) {
    try {
        yield put(loading(GET_PRODUCTS_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.list, {...payload});
        if (response && response.success) {
            yield put(success(GET_PRODUCTS_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_PRODUCTS_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_PRODUCTS_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_PRODUCTS_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_PRODUCTS_LIST_RESET});
    }
}

export function* watchProductListData() {
    yield takeLatest(GET_PRODUCTS_LIST_REQUEST, listProductRequestSaga);
}
