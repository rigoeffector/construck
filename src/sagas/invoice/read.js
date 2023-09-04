import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_INVOICES_LIST_LOADING,
    GET_INVOICES_LIST_ERROR,
    GET_INVOICES_LIST_RESET,
    GET_INVOICES_LIST_REQUEST,
    GET_INVOICES_LIST_SUCCESS,
} from '../../reducers/invoice/constant';
import {invoiceApi} from '../../api/invoice';


export function* getInvoicesListRequestSaga(action) {
    try {
        yield put(loading(GET_INVOICES_LIST_LOADING, {loading: true}));
        // eslint-disable-next-line no-unused-vars
        const {payload} = action;
        const response = yield call(invoiceApi.invoice.list);
        if (response && response.status === 200) {
            yield put(success(GET_INVOICES_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_INVOICES_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_INVOICES_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_INVOICES_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_INVOICES_LIST_RESET});
    }
}

export function* watchgetInvoicesListData() {
    yield takeLatest(GET_INVOICES_LIST_REQUEST, getInvoicesListRequestSaga);
}
