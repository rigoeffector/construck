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
import {DELETE_PRODUCT_REQUEST, GET_PRODUCTS_LIST_REQUEST} from '../../reducers/product/constant';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditProductForm from './form/edit.product.form';

const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const Products = (props) => {
    const {
        auth,
        listVendors: {data: listVendors, loading: listVendorsLoading},
        listProducts: {data, loading: listProductsLoading},
        deleteProduct: {loading: deleteLoading, message, success: deleteSuccess},
        createProduct: {loading: createLoading, success: createSuccess},
        updateProduct: {loading: updateLoading, success: updateSuccess},
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
            showAlertConfirm: false,
            editClicked: false,
            showAddNewModal: false,
            showAddNewCategoryModal: false,
            addCategoryClicked: false,
            editRow: {},
            deleteRow: {}
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
    const handleConfirmDelete = () => {
        const {row} = thisState.deleteRow;

        const payload = {
            entity_name: 'product',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys,
            instance_id: row.uuid
        };

        dispatch({type: DELETE_PRODUCT_REQUEST, payload});
    };
    useEffect(() => {
        if (createSuccess || deleteSuccess) {
            handleClose();
        }
    }, [createSuccess, deleteSuccess]);
    return (
        <BodyContainer>
            <SweetAlert
                warning
                show={deleteSuccess ? false : thisState.showAlertConfirm}
                showCancel
                title={`Are you sure you want to delete this product information ?`}
                onConfirm={() => handleConfirmDelete()}
                onCancel={() =>
                    setThisState((prev) => ({
                        ...prev,
                        showAlertConfirm: false
                    }))
                }
                focusCancelBtn
                confirmBtnText={
                    deleteLoading ? <CircularProgress style={{width: '24px', height: '24px', color: 'white', margin: '10px 0px'}} /> : 'Yes'
                }
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="secondary"
            />
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
                        <DaaDaModal title={'Edit Product'} show={thisState.editClicked} handleClose={handleClose}>
                            <EditProductForm productData={thisState.editRow} listVendors={listVendors} listCategories={listCategories} />
                        </DaaDaModal>
                        {listProductsLoading ? (
                            <CircularProgress />
                        ) : (
                            <DataTable rows={data || []} columns={columns(handleDelete, handleEdit)} />
                        )}
                    </Box>
                }
            />
            {!createLoading && createSuccess && (
                <DaaDAlerts show={createSuccess} message={'Product is created successful'} variant={'success'} />
            )}
            {!deleteLoading && deleteSuccess && (
                <DaaDAlerts show={deleteSuccess} message={'Product is deleted successful'} variant={'success'} />
            )}
            {!updateLoading && updateSuccess && (
                <DaaDAlerts show={updateSuccess} message={'Product is updated successful'} variant={'success'} />
            )}
        </BodyContainer>
    );
};

export default Products;
