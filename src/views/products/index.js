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
        listProducts: {data, loading: listProductsLoading},
        createProduct: {loading: createLoading, success: createSuccess},
        listProductCategories: {data: listCategories, loading: listCategoriesLoading}
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
            entity_name: 'product_category',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys
        };

        dispatch({type: GET_PRODUCT_CATEGORIES_LIST_REQUEST, payload});
    }, [auth?.data?.login_token, auth?.data?.username, dispatch]);
    const [thisState, setThisState] = useState(initialState);

    const handleAddNewProduct = () => {
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

    const handleEdit = (row) => {
        setThisState((prev) => ({
            editRow: row.row,
            editClicked: true,
            showEditForm: true
        }));
    };
    const handleDelete = (row) => {
        setThisState((prev) => ({
            ...prev,
            deleteRow: row,
            editClicked: false,
            showAlertConfirm: true
        }));
    };
    useEffect(() => {
        if (createSuccess) {
            handleClose();
        }
    }, [createSuccess]);
    return (
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Products'}
                actionButton={<AddNewButton title={'Add New Product'} onClick={handleAddNewProduct} />}
                contents={
                    <Box sx={{width: '100%'}}>
                        <DaaDaModal title={'Add New Product'} show={thisState.showAddNewModal} handleClose={handleClose}>
                            {listVendorsLoading ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <CreateProductForm listVendors={listVendors} listCategories={listCategories} />
                            )}
                        </DaaDaModal>
                        {listProductsLoading ? (
                            <CircularProgress />
                        ) : (
                            <DataTable rows={data || []} columns={columns(handleEdit, handleDelete)} />
                        )}
                    </Box>
                }
            />
            {!createLoading && createSuccess && (
                <DaaDAlerts show={createSuccess} message={'Product  is created successful'} variant={'success'} />
            )}
        </BodyContainer>
    );
};

export default Products;
