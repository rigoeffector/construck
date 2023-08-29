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
const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const ProductsExternal = (props) => {
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
        <Box>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: '8px',
                        background: '#1090CB'
                    }}
              >
                 Add  external asset
                </Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: '8px',
                        margin: '0px 15px',
                        background: '#1090CB'
                    }}
                >
                    Assign external asset
                </Button>
                <Button
                    variant="outlined"
                    endIcon={<SystemUpdateAltIcon />}
                    sx={{
                        borderRadius: '8px',
                        marginRight: '15px',
                        border: ' 1px solid #1090CB'
                    }}
                >
                    Bulk import
                </Button>
            </Grid>

            <BodyContainer>
                <DashBoardLayoutForPage title={''} actionButton={''} contents={''} />
            </BodyContainer>
        </Box>
    );
};

export default ProductsExternal;
