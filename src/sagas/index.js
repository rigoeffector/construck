import {all, fork} from 'redux-saga/effects';
import {watchLoginData} from './auth';

export default function* rootSaga() {
    yield all([fork(watchLoginData)]);
}
