import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {
    CREATE_PRODUCT_CATEGORY_LOADING,
    CREATE_PRODUCT_CATEGORY_ERROR,
    CREATE_PRODUCT_CATEGORY_RESET,
    CREATE_PRODUCT_CATEGORY_REQUEST,
    CREATE_PRODUCT_CATEGORY_SUCCESS
} from '../../../reducers/product/categories/constant';
import {listProductCategoryRequestSaga} from './read';
import { productApi } from '../../../api/product';

export function* createProductCategoryRequestSaga(action) {
    try {
        yield put(loading(CREATE_PRODUCT_CATEGORY_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.categories.create, {...payload});
        if (response && response.success) {
            yield put(success(CREATE_PRODUCT_CATEGORY_SUCCESS, response));
            yield* listProductCategoryRequestSaga(action);
            yield delay(2000);
            yield put({type: CREATE_PRODUCT_CATEGORY_RESET});
        } else {
            yield put(error(CREATE_PRODUCT_CATEGORY_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_PRODUCT_CATEGORY_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_PRODUCT_CATEGORY_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_PRODUCT_CATEGORY_RESET});
    }
}

export function* watchProductCreateCategoryData() {
    yield takeLatest(CREATE_PRODUCT_CATEGORY_REQUEST, createProductCategoryRequestSaga);
}
