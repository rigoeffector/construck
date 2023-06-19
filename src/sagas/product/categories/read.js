import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {
    GET_PRODUCT_CATEGORIES_LIST_LOADING,
    GET_PRODUCT_CATEGORIES_LIST_ERROR,
    GET_PRODUCT_CATEGORIES_LIST_RESET,
    GET_PRODUCT_CATEGORIES_LIST_REQUEST,
    GET_PRODUCT_CATEGORIES_LIST_SUCCESS
} from '../../../reducers/product/categories/constant';
import {productApi} from '../../../api/product';

export function* listProductCategoryRequestSaga(action) {
    try {
        yield put(loading(GET_PRODUCT_CATEGORIES_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.categories.list, {...payload});
        if (response && response.success) {
            yield put(success(GET_PRODUCT_CATEGORIES_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_PRODUCT_CATEGORIES_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_PRODUCT_CATEGORIES_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_PRODUCT_CATEGORIES_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_PRODUCT_CATEGORIES_LIST_RESET});
    }
}

export function* watchProductListCategoryData() {
    yield takeLatest(GET_PRODUCT_CATEGORIES_LIST_REQUEST, listProductCategoryRequestSaga);
}
