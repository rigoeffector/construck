import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';


import {vendorsApi} from '../../api/vendors';
import {listDriversRequestSaga} from './read';
import { GET_DRIVERS_LIST_REQUEST,  DELETE_DRIVER_LOADING,
    DELETE_DRIVER_ERROR,
    DELETE_DRIVER_RESET,
    DELETE_DRIVER_REQUEST,
    DELETE_DRIVER_SUCCESS } from '../../reducers/drivers/constant';

export function* deleteDriverRequestSaga(action) {
    try {
        yield put(loading(DELETE_DRIVER_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.delete, {...payload});
        if (response && response.success) {
            yield put(success(DELETE_DRIVER_SUCCESS, response));
            yield* listDriversRequestSaga({
                type: GET_DRIVERS_LIST_REQUEST
            });
            yield delay(2000);
            yield put({type: DELETE_DRIVER_RESET});
        } else {
            yield put(error(DELETE_DRIVER_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_DRIVER_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_DRIVER_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_DRIVER_RESET});
    }
}

export function* watchDriverDeleteData() {
    yield takeLatest(DELETE_DRIVER_REQUEST, deleteDriverRequestSaga);
}
