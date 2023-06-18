import {combineReducers} from 'redux';

import loginUserReducer from './auth';
import customizationReducer from '../store/customizationReducer';
import snackbarReducer from '../store/snackbarReducer';
import getVendorsListReducer from './vendors/read';
import createVendorReducer from './vendors/create';
import createProductReducer from './product/create';
import updateVendorReducer from './vendors/update';
import deleteVendorReducer from './vendors/delete';
import createProductCategoryReducer from './product/categories/create';
import updateProductCategoryReducer from './product/categories/update';
import deleteProductCategoryReducer from './product/categories/delete';
import readProductCategoriesReducer from './product/categories/read';
import updateProductReducer from './product/update';
import deleteProductReducer from './product/delete';
import readProductsListReducer from './product/read';
const rootReducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    auth: loginUserReducer,
    listVendors: getVendorsListReducer,
    createVendor: createVendorReducer,
    updateVendor: updateVendorReducer,
    deleteVendor: deleteVendorReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    listProducts: readProductsListReducer,
    listProductCategories: readProductCategoriesReducer,
    createProductCategory: createProductCategoryReducer,
    updateProductCategory: updateProductCategoryReducer,
    deleteProductCategory: deleteProductCategoryReducer,

});

export default rootReducer;
