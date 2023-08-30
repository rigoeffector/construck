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
import {Columns} from './table-column/external';
import CreateExternalAssetForm from './form/create.external';
import ConstruckModal from '../../reusable/modal';
import AssignExternalAssetForm from './form/assign.external';
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

    const [showNewModal, setShowNewModal] = useState(false);
    const [thisState, setThisState] = useState(initialState);
    const [showAssignModel, setShowAssignModal] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showArchiveModel, setShowArchiveModel] = useState(false);

    const handleAddNewProduct = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: true,
            addCategoryClicked: false,
            showAddNewCategoryModal: false
        }));
    };

    const handleClose = () => {
        setShowNewModal(false);
        setShowAssignModal(false);
        setShowDeleteModel(false);
        setShowMoreInfo(false);
        setShowArchiveModel(false);

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
            assignedTo: 'Angela UWACU',
            duration: '4 months',
            description:'Loading Truck',
            status: 'Available'
        },
        {
            id: '2',
            name: 'Computer Laptop',
            category: 'Dump Truck',
            assignedTo: 'Angela UWACU',
            duration: '4 months',
            description:'Loading Truck',
            status: 'Maintenance'
        },
        {
            id: '3',
            name: 'Computer Laptop',
            category: 'Dump Truck',
            assignedTo: 'Angela UWACU',
            duration: '4 months',
            description:'Loading Truck',
            status: 'Unavailable'
        },
        {
            id: '4',
            name: 'Computer Laptop',
            category: 'Dump Truck',
            assignedTo: 'Angela UWACU',
            duration: '4 months',
            description:'Loading Truck',
            status: 'Available'
        }
    ];
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleShowAddNew = () => {
        setShowNewModal(true);
    };
    const handleShowAssignNew = () => {
        setShowAssignModal(true);
    };

    const handleViewMore = () => {
        setShowMoreInfo(true);
    };

    const handleArchive = () => {
        setShowArchiveModel(true);
    };

    const handleEdit = () => {
        console.log('Edit');
    };

    const handleDelete = () => {
        setShowDeleteModel(true);
    };
    return (
        <Box>
         <ConstruckModal title="Add external asset" show={showNewModal} handleClose={handleClose}>
                <CreateExternalAssetForm />
            </ConstruckModal>
            <ConstruckModal title="Assign  external asset" show={showAssignModel} handleClose={handleClose}>
                <AssignExternalAssetForm />
            </ConstruckModal>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleShowAddNew}
                    sx={{
                        borderRadius: '8px',
                        background: '#1090CB'
                    }}
                >
                    Add external asset
                </Button>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleShowAssignNew}
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
                <DashBoardLayoutForPage
                    title={''}
                    actionButton={''}
                    contents={<DataTable rows={data} enabledFilters={false} columns={Columns(handleViewMore, handleEdit, handleArchive, handleDelete)} />}
                />
            </BodyContainer>
        </Box>
    );
};

export default ProductsExternal;
