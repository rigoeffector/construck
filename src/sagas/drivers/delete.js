import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    DELETE_VENDOR_LOADING,
    DELETE_VENDOR_ERROR,
    DELETE_VENDOR_RESET,
    DELETE_VENDOR_REQUEST,
    DELETE_VENDOR_SUCCESS
} from '../../reducers/vendors/constant';
import {vendorsApi} from '../../api/vendors';
import {listVendorsRequestSaga} from './read';

export function* deleteVendorRequestSaga(action) {
    try {
        yield put(loading(DELETE_VENDOR_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.delete, {...payload});
        if (response && response.success) {
            yield put(success(DELETE_VENDOR_SUCCESS, response));
            yield* listVendorsRequestSaga(action);
            yield delay(2000);
            yield put({type: DELETE_VENDOR_RESET});
        } else {
            yield put(error(DELETE_VENDOR_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_VENDOR_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_VENDOR_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_VENDOR_RESET});
    }
}

export function* watchVendorDeleteData() {
    yield takeLatest(DELETE_VENDOR_REQUEST, deleteVendorRequestSaga);
}
