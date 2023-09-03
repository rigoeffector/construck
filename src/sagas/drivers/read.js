import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_VENDORS_LIST_LOADING,
    GET_VENDORS_LIST_ERROR,
    GET_VENDORS_LIST_RESET,
    GET_VENDORS_LIST_REQUEST,
    GET_VENDORS_LIST_SUCCESS
} from '../../reducers/drivers/constant';
import {vendorsApi} from '../../api/vendors';

export function* listVendorsRequestSaga(action) {
    try {
        yield put(loading(GET_VENDORS_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.list, {...payload});
        if (response && response.success) {
            yield put(success(GET_VENDORS_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_VENDORS_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_VENDORS_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_VENDORS_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_VENDORS_LIST_RESET});
    }
}

export function* watchVendorsListData() {
    yield takeLatest(GET_VENDORS_LIST_REQUEST, listVendorsRequestSaga);
}
