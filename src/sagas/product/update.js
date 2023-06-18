import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    UPDATE_PRODUCT_LOADING,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';


export function* updateProductRequestSaga(action) {
    try {
        yield put(loading(UPDATE_PRODUCT_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.delete, {...payload});
        if (response && response.success) {
            yield put(success(UPDATE_PRODUCT_SUCCESS, response));
            yield delay(2000);
            yield put({type: UPDATE_PRODUCT_RESET});
        } else {
            yield put(error(UPDATE_PRODUCT_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_PRODUCT_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_PRODUCT_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_PRODUCT_RESET});
    }
}

export function* watchProductUpdateData() {
    yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProductRequestSaga);
}
