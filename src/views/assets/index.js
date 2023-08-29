/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */

/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import {columns} from './table-column';
import {Box, Grid} from '@mui/material';
import {DataTable} from '../../reusable/table';
import {useDispatch, useSelector} from 'react-redux';
import {initialState} from './schema';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PageContainer from '../../reusable/breadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ProductsExternal from './external';
import ProductsInternal from './internal';
const keys = process.env.REACT_APP_ADDAX_API_KEY;

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{p: 0}}>
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
export const Products = (props) => {
    const {
        // auth,
        // listVendors: {data: listVendors, loading: listVendorsLoading},
        // listProducts: {data, loading: listProductsLoading},
        // deleteProduct: {loading: deleteLoading, message, success: deleteSuccess},
        // createProduct: {loading: createLoading, success: createSuccess},
        // updateProduct: {loading: updateLoading, success: updateSuccess},
        // listProductCategories: {data: listCategories, loading: listCategoriesLoading}
    } = useSelector((state) => state);
    const dispatch = useDispatch();

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

    const handleAssignAsset = (row) => {
        setThisState((prev) => ({
            editRow: row.row,
            editClicked: true,
            showEditForm: true
        }));
    };

    const data = [
        {
            id: '1',
            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '2',

            name: 'Mouse',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '3',

            name: 'Cables Phone',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '4',

            name: 'Car',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '5',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestedBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '6',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '7',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        }
    ];
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <PageContainer pageHeading="Assets list">
            <Box sx={{borderBottom: 0, borderColor: 'divider', margin: '2rem 0px'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Internal Assets" {...a11yProps(0)} />
                    <Tab label="External Assets" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <Box sx={{width: '100%'}}>
                <TabPanel value={value} index={0}>
                    
                        <ProductsInternal />
                   
                </TabPanel>
                <TabPanel value={value} index={1}>
                   
                        <ProductsExternal />
                    
                </TabPanel>
            </Box>
        </PageContainer>
    );
};

export default Products;
