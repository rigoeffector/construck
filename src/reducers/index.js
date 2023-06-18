import {combineReducers} from 'redux';

import loginUserReducer from './auth';
import customizationReducer from '../store/customizationReducer';
import snackbarReducer from '../store/snackbarReducer';
import getVendorsListReducer  from './vendors/read'
import createVendorReducer from './vendors/create';
const rootReducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    auth: loginUserReducer,
    listVendors: getVendorsListReducer,
    createVendor: createVendorReducer
});

export default rootReducer;
