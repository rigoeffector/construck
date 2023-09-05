import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_INVOICE_LOADING,
    CREATE_INVOICE_ERROR,
    CREATE_INVOICE_RESET,
    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
    GET_INVOICES_LIST_REQUEST
} from '../../reducers/invoice/constant';
import {invoiceApi} from '../../api/invoice';
import {getInvoicesListRequestSaga} from './read';
import { listRequestedAssetsRequestSaga } from '../product/view.requested.assets';
import { VIEW_ALL_REQUESTS_ASSETS_REQUEST } from '../../reducers/product/constant';

export function* createInvoiceRequestSaga(action) {
    try {
        yield put(loading(CREATE_INVOICE_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(invoiceApi.invoice.create, {...payload});
        if (response && response.status === 201) {
            yield put(success(CREATE_INVOICE_SUCCESS, response));
            yield* getInvoicesListRequestSaga({
                type: GET_INVOICES_LIST_REQUEST
            });
            yield* listRequestedAssetsRequestSaga({
                type: VIEW_ALL_REQUESTS_ASSETS_REQUEST
            });
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
