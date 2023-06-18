import { all, fork } from 'redux-saga/effects';
import { watchLoginData } from './auth';
import { watchVendorsListData } from './vendors/read';
import { watchVendorCreateData } from './vendors/create';
import { watchProductCreateData } from './product/create';

export default function* rootSaga() {
    yield all([fork(watchLoginData), fork(watchVendorsListData), fork(watchVendorCreateData), fork(watchProductCreateData)]);
}
