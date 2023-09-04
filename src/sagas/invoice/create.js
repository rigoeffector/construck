import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_INVOICE_LOADING,
    CREATE_INVOICE_ERROR,
    CREATE_INVOICE_RESET,
    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
} from '../../reducers/invoice/constant';
import {invoiceApi} from '../../api/invoice';


export function* createInvoiceRequestSaga(action) {
    try {
        yield put(loading(CREATE_INVOICE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(invoiceApi.invoice.create, {...payload});
        if (response && response.status === 201) {
            yield put(success(CREATE_INVOICE_SUCCESS, response));
            
            yield delay(2000);
            yield put({type: CREATE_INVOICE_RESET});
        } else {
            yield put(error(CREATE_INVOICE_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_INVOICE_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_INVOICE_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_INVOICE_RESET});
    }
}

export function* watchCreateInvoiceData() {
    yield takeLatest(CREATE_INVOICE_REQUEST, createInvoiceRequestSaga);
}
