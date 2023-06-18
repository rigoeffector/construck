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
import {rows} from './table-column/row';
import {useDispatch, useSelector} from 'react-redux';
import {GET_VENDORS_LIST_REQUEST} from '../../reducers/vendors/constant';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {initialState} from './schema';
import DaaDAlerts from '../../reusable/alerts';
import CreateProductForm from './form/create.product.form';
import CreateProductCategoryForm from './form/create.category.form';
import {GET_PRODUCT_CATEGORIES_LIST_REQUEST} from '../../reducers/product/categories/constant';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}
const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const Products = (props) => {
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

    const handleAddNewProduct = () => {
        debugger;
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: true,
            addCategoryClicked: false,
            showAddNewCategoryModal: false
        }));
    };
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
        // thisState.showAddNewCategoryModal ? thisState.showAddNewCategoryModal :
        <BodyContainer>
            <DashBoardLayoutForPage
                title={value === 0 ? 'All Products Categories' : 'All Products'}
                actionButton={
                    <AddNewButton
                        title={value === 0 ? 'Add New Category' : 'Add New Product'}
                        onClick={value === 0 ? handleAddNewCategory : handleAddNewProduct}
                    />
                }
                contents={
                    <Box sx={{width: '100%'}}>
                        <DaaDaModal
                            title={thisState.showAddNewCategoryModal ? 'Add New Category' : 'Add New Product'}
                            show={thisState.showAddNewCategoryModal ? thisState.showAddNewCategoryModal : thisState.showAddNewModal}
                            handleClose={handleClose}
                        >
                            {thisState.showAddNewCategoryModal && value === 0 ? (
                                <CreateProductCategoryForm />
                            ) : thisState.showAddNewModal && value === 1 && listVendorsLoading ? (
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
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Product Categories" {...a11yProps(0)} />
                                <Tab label="All Products" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            {value}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <DataTable rows={rows} columns={columns} />
                        </TabPanel>
                    </Box>
                }
            />
            {!loading && success && <DaaDAlerts show={success} message={'Product category is created successful'} variant={'success'} />}
        </BodyContainer>
    );
};

export default Products;
