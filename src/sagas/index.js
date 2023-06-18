import {all, fork} from 'redux-saga/effects';
import {watchLoginData} from './auth';
import {watchVendorsListData} from './vendors/read';
import {watchVendorCreateData} from './vendors/create';
import {watchProductCreateData} from './product/create';
import {watchVendorDeleteData} from './vendors/delete';
import {watchVendorUpdateData} from './vendors/update';
import {watchProductCreateCategoryData} from './product/categories/create';
import {watchProductListCategoryData} from './product/categories/read';

export default function* rootSaga() {
    yield all([
        fork(watchLoginData),
        fork(watchVendorsListData),
        fork(watchVendorCreateData),
        fork(watchProductCreateData),
        fork(watchVendorDeleteData),
        fork(watchVendorUpdateData),
        fork(watchProductCreateCategoryData),
        fork(watchProductListCategoryData)
    ]);
}
