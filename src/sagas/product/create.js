import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_PRODUCT_LOADING,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';
// import {listPRODUCTsRequestSaga} from './read';

export function* createProductRequestSaga(action) {
    try {
        yield put(loading(CREATE_PRODUCT_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.create.product, {...payload});
        if (response && response.success) {
            yield put(success(CREATE_PRODUCT_SUCCESS, response));
            // yield* listProductsRequestSaga(action);
            yield delay(2000);
            yield put({type: CREATE_PRODUCT_RESET});
        } else {
            yield put(error(CREATE_PRODUCT_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_PRODUCT_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_PRODUCT_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_PRODUCT_RESET});
    }
}

export function* watchProductCreateData() {
    yield takeLatest(CREATE_PRODUCT_REQUEST, createProductRequestSaga);
}
