import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    UPDATE_VENDOR_LOADING,
    UPDATE_VENDOR_ERROR,
    UPDATE_VENDOR_RESET,
    UPDATE_VENDOR_REQUEST,
    UPDATE_VENDOR_SUCCESS
} from '../../reducers/vendors/constant';
import {vendorsApi} from '../../api/vendors';
import {listVendorsRequestSaga} from './read';

export function* updateVendorRequestSaga(action) {
    try {
        yield put(loading(UPDATE_VENDOR_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.update, {...payload});
        if (response && response.success) {
            yield put(success(UPDATE_VENDOR_SUCCESS, response));
            yield* listVendorsRequestSaga(action);
            yield delay(2000);
            yield put({type: UPDATE_VENDOR_RESET});
        } else {
            yield put(error(UPDATE_VENDOR_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_VENDOR_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_VENDOR_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_VENDOR_RESET});
    }
}

export function* watchVendorUpdateData() {
    yield takeLatest(UPDATE_VENDOR_REQUEST, updateVendorRequestSaga);
}
