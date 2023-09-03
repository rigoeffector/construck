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
    updateExternalAssetStatus: updateExternalAssetStatusReducer
});

export default rootReducer;
