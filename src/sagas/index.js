import {all, fork} from 'redux-saga/effects';
import {watchLoginData} from './auth';
import {watchVendorsListData} from './vendors';
import {watchVendorCreateData} from './vendors/create';

export default function* rootSaga() {
    yield all([fork(watchLoginData), fork(watchVendorsListData), fork(watchVendorCreateData)]);
}
