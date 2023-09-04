import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    UPDATE_INVOICE_STATUS_LOADING,
    UPDATE_INVOICE_STATUS_ERROR,
    UPDATE_INVOICE_STATUS_RESET,
    UPDATE_INVOICE_STATUS_REQUEST,
    UPDATE_INVOICE_STATUS_SUCCESS,
} from '../../reducers/invoice/constant';
import {invoiceApi} from '../../api/invoice';


export function* UpdateInvoiceStatusRequestSaga(action) {
    try {
        yield put(loading(UPDATE_INVOICE_STATUS_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(invoiceApi.invoice.updateStatus, {...payload});
        if (response && response.status === 201) {
            yield put(success(UPDATE_INVOICE_STATUS_SUCCESS, response));
            
            yield delay(2000);
            yield put({type: UPDATE_INVOICE_STATUS_RESET});
        } else {
            yield put(error(UPDATE_INVOICE_STATUS_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_INVOICE_STATUS_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_INVOICE_STATUS_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_INVOICE_STATUS_RESET});
    }
}

export function* watchUpdateInvoiceStatusData() {
    yield takeLatest(UPDATE_INVOICE_STATUS_REQUEST, UpdateInvoiceStatusRequestSaga);
}
