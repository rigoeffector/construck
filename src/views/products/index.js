/* eslint-disable no-unused-vars */

/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import AddNewButton from '../../reusable/actions-button/addnew';
import {DaaDaModal} from '../../reusable/modal';
import {columns} from './table-column';
import {Box, CircularProgress} from '@mui/material';
import {DataTable} from '../../reusable/table';
import {useDispatch, useSelector} from 'react-redux';
import {GET_VENDORS_LIST_REQUEST} from '../../reducers/vendors/constant';
import {initialState} from './schema';
import DaaDAlerts from '../../reusable/alerts';
import CreateProductForm from './form/create.product.form';
import {GET_PRODUCT_CATEGORIES_LIST_REQUEST} from '../../reducers/product/categories/constant';
import {GET_PRODUCTS_LIST_REQUEST} from '../../reducers/product/constant';

const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const Products = (props) => {
    const {
        auth,
        listVendors: {data: listVendors, loading: listVendorsLoading},
        listProducts: {data: listProducts, loading: listProductsLoading},
        listProductCategories: {data: listCategories, loading: listCategoriesLoading},
        createProductCategory: {loading, success}
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const payload = {
            entity_name: 'product',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys
        };

        dispatch({type: GET_PRODUCTS_LIST_REQUEST, payload});
    }, [auth?.data?.login_token, auth?.data?.username, dispatch]);
    useEffect(() => {
        const payload = {
            entity_name: 'vendor',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys
        };

        dispatch({type: GET_VENDORS_LIST_REQUEST, payload});
    }, [auth?.data?.login_token, auth?.data?.username, dispatch]);
    useEffect(() => {
        const payload = {
            entity_name: 'product',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys
        };
        debugger;
        dispatch({type: GET_PRODUCT_CATEGORIES_LIST_REQUEST, payload});
    }, [auth?.data?.login_token, auth?.data?.username, dispatch]);
    const [thisState, setThisState] = useState(initialState);

    const handleAddNewProduct = () => {
        debugger;
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: true,
            addCategoryClicked: false,
            showAddNewCategoryModal: false
        }));
    };

    const handleClose = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: false,
            showAddNewCategoryModal: false,
            addCategoryClicked: false
        }));
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (success) {
            handleClose();
        }
    }, [success]);
    return (
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Products'}
                actionButton={<AddNewButton title={'Add New Product'} onClick={handleAddNewProduct} />}
                contents={
                    <Box sx={{width: '100%'}}>
                        <DaaDaModal title={'Add New Product'} show={thisState.showAddNewModal} handleClose={handleClose}>
                            {thisState.showAddNewModal && value === 1 && listVendorsLoading ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <CreateProductForm listVendors={listVendors} />
                            )}
                        </DaaDaModal>
                        {listProductsLoading ? <CircularProgress /> : <DataTable rows={listProducts || []} columns={columns} />}
                    </Box>
                }
            />
            {!loading && success && <DaaDAlerts show={success} message={'Product category is created successful'} variant={'success'} />}
        </BodyContainer>
    );
};

export default Products;
