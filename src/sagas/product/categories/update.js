import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {
    UPDATE_PRODUCT_CATEGORY_LOADING,
    UPDATE_PRODUCT_CATEGORY_ERROR,
    UPDATE_PRODUCT_CATEGORY_RESET,
    UPDATE_PRODUCT_CATEGORY_REQUEST,
    UPDATE_PRODUCT_CATEGORY_SUCCESS
} from '../../../reducers/product/categories/constant';
import {listProductCategoryRequestSaga} from './read';
import { productApi } from '../../../api/product';

export function* updateProductCategoryRequestSaga(action) {
    try {
        yield put(loading(UPDATE_PRODUCT_CATEGORY_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.categories.update, {...payload});
        if (response && response.success) {
            yield put(success(UPDATE_PRODUCT_CATEGORY_SUCCESS, response));
            yield* listProductCategoryRequestSaga(action);
            yield delay(2000);
            yield put({type: UPDATE_PRODUCT_CATEGORY_RESET});
        } else {
            yield put(error(UPDATE_PRODUCT_CATEGORY_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_PRODUCT_CATEGORY_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_PRODUCT_CATEGORY_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_PRODUCT_CATEGORY_RESET});
    }
}

export function* watchProductUpdateCategoryData() {
    yield takeLatest(UPDATE_PRODUCT_CATEGORY_REQUEST, updateProductCategoryRequestSaga);
}
