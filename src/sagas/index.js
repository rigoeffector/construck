import {all, fork} from 'redux-saga/effects';
import {watchLoginData} from './auth';
import {watchRequestedAssetsData} from './product/view.requested.assets';
import {watchInternalAssetsListData} from './product/read';
import {watchCreateInternalAssetData} from './product/create';
import {watchDeleteInternalAssetData} from './product/delete';
import {watchUpdateInternalAssetStatusData} from './product/update.internal.asset.status';
import {watchCreateExternalAssetData} from './product/external/create';
import { watchDeleteExternalAssetData } from './product/external/delete';
import { watchExternalAssetsListData } from './product/external/read';
import { watchUpdateExternalAssetStatusData } from './product/external/update.internal.asset.status';
import { watchDriverCreateData } from './drivers/create';
import { watchDriversListData } from './drivers/read';
import { watchDriverDeleteData } from './drivers/delete';
import { watchCompanyRequestAssetData } from './company';
import { watchAssetsTypesListData } from './product/readAllTypes';
import { watchIndividualRequestAssetData } from './company/individual';
import { watchCreateInvoiceData } from './invoice/create';
import { watchUpdateInvoiceStatusData } from './invoice/updateStatus';
import { watchgetInvoicesListData } from './invoice/read';
import { watchStatsListData } from './stats/read';

export default function* rootSaga() {
    yield all([
        fork(watchLoginData),
        fork(watchRequestedAssetsData),
        fork(watchInternalAssetsListData),
        fork(watchCreateInternalAssetData),
        fork(watchDeleteInternalAssetData),
        fork(watchUpdateInternalAssetStatusData),
        fork(watchCreateExternalAssetData),
        fork(watchExternalAssetsListData),
        fork(watchDeleteExternalAssetData),
        fork(watchUpdateExternalAssetStatusData),
        fork(watchDriverCreateData),
        fork(watchDriversListData),
        fork(watchDriverDeleteData),
        fork(watchCompanyRequestAssetData),
        fork(watchAssetsTypesListData),
        fork(watchIndividualRequestAssetData),
        fork(watchCreateInvoiceData),
        fork(watchUpdateInvoiceStatusData),
        fork(watchgetInvoicesListData),
        fork(watchStatsListData)
    ]);
}
