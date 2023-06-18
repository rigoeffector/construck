import {all, fork} from 'redux-saga/effects';
import {watchLoginData} from './auth';
import {watchVendorsListData} from './vendors/read';
import {watchVendorCreateData} from './vendors/create';
import {watchProductCreateData} from './product/create';
import {watchVendorDeleteData} from './vendors/delete';
import {watchVendorUpdateData} from './vendors/update';
import {watchProductCreateCategoryData} from './product/categories/create';
import {watchProductListCategoryData} from './product/categories/read';
import {watchProductDeleteCategoryData} from './product/categories/delete';
import {watchProductUpdateCategoryData} from './product/categories/update';
import {watchProductDeleteData} from './product/delete';
import { watchProductListData } from './product/read';
import { watchProductUpdateData } from './product/update';

export default function* rootSaga() {
    yield all([
        fork(watchLoginData),
        fork(watchVendorsListData),
        fork(watchVendorCreateData),
        fork(watchVendorDeleteData),
        fork(watchVendorUpdateData),
        fork(watchProductCreateData),
        fork(watchProductDeleteData),
        fork(watchProductUpdateData),
        fork(watchProductListData),
        fork(watchProductCreateCategoryData),
        fork(watchProductListCategoryData),
        fork(watchProductDeleteCategoryData),
        fork(watchProductUpdateCategoryData)
    ]);
}
