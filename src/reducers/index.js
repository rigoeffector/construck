import {combineReducers} from 'redux';

import loginUserReducer from './auth';
import customizationReducer from '../store/customizationReducer';
import snackbarReducer from '../store/snackbarReducer';

const rootReducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    auth: loginUserReducer
});

export default rootReducer;
