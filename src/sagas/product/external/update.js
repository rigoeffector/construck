import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    UPDATE_INTERNAL_ASSET_STATUS_LOADING,
    UPDATE_INTERNAL_ASSET_STATUS_ERROR,
    UPDATE_INTERNAL_ASSET_STATUS_RESET,
    UPDATE_INTERNAL_ASSET_STATUS_REQUEST,
    UPDATE_INTERNAL_ASSET_STATUS_SUCCESS
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';

import {listProductRequestSaga} from './read';

export function* updateProductRequestSaga(action) {
    try {
        yield put(loading(UPDATE_INTERNAL_ASSET_STATUS_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.update, {...payload});
        if (response && response.success) {
            yield put(success(UPDATE_INTERNAL_ASSET_STATUS_SUCCESS, response));
            yield* listProductRequestSaga(action);

            yield delay(2000);
            yield put({type: UPDATE_INTERNAL_ASSET_STATUS_RESET});
        } else {
            yield put(error(UPDATE_INTERNAL_ASSET_STATUS_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_INTERNAL_ASSET_STATUS_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_INTERNAL_ASSET_STATUS_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_INTERNAL_ASSET_STATUS_RESET});
    }
}

export function* watchProductUpdateData() {
    yield takeLatest(UPDATE_INTERNAL_ASSET_STATUS_REQUEST, updateProductRequestSaga);
}
