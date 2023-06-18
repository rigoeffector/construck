/* eslint-disable no-unused-vars */

/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import AddNewButton from '../../reusable/actions-button/addnew';
import {DaaDaModal} from '../../reusable/modal';
import {columns} from './table-column';
import {Box} from '@mui/material';
import {DataTable} from '../../reusable/table';
import {rows} from './table-column/row';
import {useDispatch, useSelector} from 'react-redux';
import {GET_VENDORS_LIST_REQUEST} from '../../reducers/vendors/constant';
import {initialState} from './schema';
import DaaDAlerts from '../../reusable/alerts';
import CreateProductCategoryForm from './form/create.category.form';
import {GET_PRODUCT_CATEGORIES_LIST_REQUEST} from '../../reducers/product/categories/constant';

const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const ProductDetailsPage = (props) => {
    const {
        auth,
        listVendors: {data: listVendors, loading: listVendorsLoading},
        listProductCategories: {data: listCategories, loading: listCategoriesLoading},
        createProductCategory: {loading, success}
    } = useSelector((state) => state);
    const dispatch = useDispatch();
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

    const handleAddNewCategory = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: false,
            showAddNewCategoryModal: true,
            addCategoryClicked: true
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

    useEffect(() => {
        if (success) {
            handleClose();
        }
    }, [success]);
    return (
        
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Products Categories'}
                actionButton={<AddNewButton title={'Add New Category'} onClick={handleAddNewCategory} />}
                contents={
                    <Box sx={{width: '100%'}}>
                        <DaaDaModal
                            title={'Add New Category'}
                            show={thisState.showAddNewCategoryModal}
                            handleClose={handleClose}
                        >
                            <CreateProductCategoryForm />
                        </DaaDaModal>
                        <DataTable rows={rows} columns={columns} />
                    </Box>
                }
            />
            {!loading && success && <DaaDAlerts show={success} message={'Product category is created successful'} variant={'success'} />}
        </BodyContainer>
    );
};

export default ProductDetailsPage;