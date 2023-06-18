import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {
    DELETE_PRODUCT_CATEGORY_LOADING,
    DELETE_PRODUCT_CATEGORY_ERROR,
    DELETE_PRODUCT_CATEGORY_RESET,
    DELETE_PRODUCT_CATEGORY_REQUEST,
    DELETE_PRODUCT_CATEGORY_SUCCESS
} from '../../../reducers/product/categories/constant';
import {listProductCategoryRequestSaga} from './read';
import { productApi } from '../../../api/product';

export function* deleteProductCategoryRequestSaga(action) {
    try {
        yield put(loading(DELETE_PRODUCT_CATEGORY_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.categories.delete, {...payload});
        if (response && response.success) {
            yield put(success(DELETE_PRODUCT_CATEGORY_SUCCESS, response));
            yield* listProductCategoryRequestSaga(action);
            yield delay(2000);
            yield put({type: DELETE_PRODUCT_CATEGORY_RESET});
        } else {
            yield put(error(DELETE_PRODUCT_CATEGORY_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_PRODUCT_CATEGORY_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_PRODUCT_CATEGORY_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_PRODUCT_CATEGORY_RESET});
    }
}

export function* watchProductDeleteCategoryData() {
    yield takeLatest(DELETE_PRODUCT_CATEGORY_REQUEST, deleteProductCategoryRequestSaga);
}
