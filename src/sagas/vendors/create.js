import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_VENDOR_LOADING,
    CREATE_VENDOR_ERROR,
    CREATE_VENDOR_RESET,
    CREATE_VENDOR_REQUEST,
    CREATE_VENDOR_SUCCESS
} from '../../reducers/vendors/constant';
import {vendorsApi} from '../../api/vendors';
import {listVendorsRequestSaga} from './read';

export function* createVendorRequestSaga(action) {
    try {
        yield put(loading(CREATE_VENDOR_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.create.vendor, {...payload});
        if (response && response.success) {
            yield put(success(CREATE_VENDOR_SUCCESS, response));
            yield* listVendorsRequestSaga(action);
            yield delay(2000);
            yield put({type: CREATE_VENDOR_RESET});
        } else {
            yield put(error(CREATE_VENDOR_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_VENDOR_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_VENDOR_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_VENDOR_RESET});
    }
}

export function* watchVendorCreateData() {
    yield takeLatest(CREATE_VENDOR_REQUEST, createVendorRequestSaga);
}
