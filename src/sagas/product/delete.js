import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    DELETE_PRODUCT_LOADING,
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';


export function* deleteProductRequestSaga(action) {
    try {
        yield put(loading(DELETE_PRODUCT_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.delete, {...payload});
        if (response && response.success) {
            yield put(success(DELETE_PRODUCT_SUCCESS, response));
            yield delay(2000);
            yield put({type: DELETE_PRODUCT_RESET});
        } else {
            yield put(error(DELETE_PRODUCT_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_PRODUCT_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_PRODUCT_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_PRODUCT_RESET});
    }
}

export function* watchProductDeleteData() {
    yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductRequestSaga);
}
