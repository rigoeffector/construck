import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {loginApi} from '../../api/auth';
import {LOGIN_USER_LOADING, LOGIN_USER_ERROR, LOGIN_USER_RESET, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS} from '../../reducers/auth/constant';
import history from '../../history';
import {saveState} from '../../utils';

export function* loginRequestSaga(action) {
    try {
        yield put(loading(LOGIN_USER_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(loginApi.auth.login, {...payload});
        if (response && response.status === 201) {
            const ctx = buildContext(response.data || {});

            saveState('ctx', ctx);
            yield put(success('CONTEXT', ctx));
            yield put(success(LOGIN_USER_SUCCESS, response));
            // history.push('/daada/dashboard/home');
            history.push('/dashboard/overview');
            yield delay(1000);
            window.location.reload();
        } else {
            yield put(error(LOGIN_USER_ERROR, response));
            yield delay(2000);
            yield put({type: LOGIN_USER_RESET});
        }
    } catch (err) {
        yield put(error(LOGIN_USER_ERROR, err));
        yield delay(2000);
        yield put({type: LOGIN_USER_RESET});
    }
}
function buildContext(data) {
    return {
        firstName: data && data.USER?.firstName,
        lastName: data && data.USER?.lastName,
        token: data && data.JWT_TOKEN,
        role: data && data.USER?.role,
        username: data && data.USER?.username,
    };
}
export function* watchLoginData() {
    yield takeLatest(LOGIN_USER_REQUEST, loginRequestSaga);
}
