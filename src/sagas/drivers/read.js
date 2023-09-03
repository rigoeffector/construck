import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    GET_DRIVERS_LIST_LOADING,
    GET_DRIVERS_LIST_ERROR,
    GET_DRIVERS_LIST_RESET,
    GET_DRIVERS_LIST_REQUEST,
    GET_DRIVERS_LIST_SUCCESS
} from '../../reducers/drivers/constant';
import {vendorsApi} from '../../api/vendors';

export function* listDriversRequestSaga(action) {
    try {
        yield put(loading(GET_DRIVERS_LIST_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.list, {...payload});
        if (response && response.status === 200) {
            yield put(success(GET_DRIVERS_LIST_SUCCESS, response));
        } else {
            yield put(error(GET_DRIVERS_LIST_ERROR, response));
            yield delay(2000);
            yield put({type: GET_DRIVERS_LIST_RESET});
        }
    } catch (err) {
        yield put(error(GET_DRIVERS_LIST_ERROR, err));
        yield delay(2000);
        yield put({type: GET_DRIVERS_LIST_RESET});
    }
}

export function* watchDriversListData() {
    yield takeLatest(GET_DRIVERS_LIST_REQUEST, listDriversRequestSaga);
}
