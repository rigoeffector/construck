import {combineReducers} from 'redux';

import loginUserReducer from './auth';
import customizationReducer from '../store/customizationReducer';
import snackbarReducer from '../store/snackbarReducer';
import getVendorsListReducer  from './vendors'
const rootReducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    auth: loginUserReducer,
    listVendors: getVendorsListReducer
});

export default rootReducer;
