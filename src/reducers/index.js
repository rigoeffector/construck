import {combineReducers} from 'redux';

import loginUserReducer from './auth';
import customizationReducer from '../store/customizationReducer';
import snackbarReducer from '../store/snackbarReducer';
import readRequestedAssetsReducer from './product/requested.assests';
import readInternalAssetsListReducer from './product/read';
import createInternalAssetReducer from './product/create';
import deleteInternalAssetReducer from './product/delete';
import updateInternalAssetStatusReducer from './product/update.status';
import createExternalAssetReducer from './product/external/create';
import deleteEternalAssetReducer from './product/external/delete';
import readExternalAssetsListReducer from './product/external/read';
import updateExternalAssetStatusReducer from './product/external/update.status';
import updateDriverReducer from './drivers/update';
import createDriverReducer from './drivers/create';
import deleteDriverReducer from './drivers/delete';
import getDriversListReducer from './drivers/read';
import companyRequestAssetReducer from './company/requestasset';
import getAssetTypesListReducer from './product/assetTypes';
import individualRequestAssetReducer from './company/individual';

const rootReducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    auth: loginUserReducer,
    listRequestedAssets: readRequestedAssetsReducer,
    listInternalAllAssets: readInternalAssetsListReducer,
    createInternalAsset: createInternalAssetReducer,
    deleteInternalAsset: deleteInternalAssetReducer,
    updateInternalAssetStatus: updateInternalAssetStatusReducer,
    createExternalAsset: createExternalAssetReducer,
    deleteExternalAsset: deleteEternalAssetReducer,
    listExternalAllAssets: readExternalAssetsListReducer,
    updateExternalAssetStatus: updateExternalAssetStatusReducer,
    updateDriver: updateDriverReducer,
    createDriver: createDriverReducer,
    deleteDriver: deleteDriverReducer,
    listDrivers: getDriversListReducer,
    companyRequestAsset: companyRequestAssetReducer,
    listAssetTypes: getAssetTypesListReducer,
    individualRequestAsset : individualRequestAssetReducer
});

export default rootReducer;
