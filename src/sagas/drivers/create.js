import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_DRIVER_LOADING,
    CREATE_DRIVER_ERROR,
    CREATE_DRIVER_RESET,
    CREATE_DRIVER_REQUEST,
    CREATE_DRIVER_SUCCESS
} from '../../reducers/drivers/constant';
import {vendorsApi} from '../../api/vendors';
import {listDriversRequestSaga} from './read';
import {GET_DRIVERS_LIST_REQUEST} from '../../reducers/drivers/constant';

export function* createDriverRequestSaga(action) {
    try {
        yield put(loading(CREATE_DRIVER_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.create, {...payload});
        if (response && response.status === 201) {
            yield put(success(CREATE_DRIVER_SUCCESS, response));
            yield* listDriversRequestSaga({
                type: GET_DRIVERS_LIST_REQUEST
            });
            yield delay(2000);
            yield put({type: CREATE_DRIVER_RESET});
        } else {
            yield put(error(CREATE_DRIVER_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_DRIVER_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_DRIVER_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_DRIVER_RESET});
    }
}

export function* watchDriverCreateData() {
    yield takeLatest(CREATE_DRIVER_REQUEST, createDriverRequestSaga);
}
