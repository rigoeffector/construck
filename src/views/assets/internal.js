/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */

/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import {Columns, columns} from './table-column';
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
import ConstruckModal from '../../reusable/modal';
import CreateAssetForm from './form/create.asset.form';
import AssignInternalAssetForm from './form/assign.internal';
import SubmitButton from '../../reusable/submit-button';
const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const ProductsInternal = (props) => {
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
            <ConstruckModal title="Add asset" show={showNewModal} handleClose={handleClose}>
                <CreateAssetForm />
            </ConstruckModal>
            <ConstruckModal title="Assign asset" show={showAssignModel} handleClose={handleClose}>
                <AssignInternalAssetForm />
            </ConstruckModal>
            <ConstruckModal title="Delete asset" show={showDeleteModel} handleClose={handleClose}>
                <Typography
                    sx={{
                        alignSelf: 'center'
                    }}
                >
                    Are you sure you want to delete{' '}
                    <span
                        style={{
                            fontWeight: '700',
                            color: '#282546'
                        }}
                    >
                        Truck (RAD 123 S)
                    </span>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            margin: '0px 10px',
                            borderRadius: '8px',
                            background: '#EDEFF2',
                            color:  '#64748A !important',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            background: '#1090CB',
                            color: '#FFF',
                            fontWeight: '500'


                        }}
                    >
                        Confirm
                    </Button>
                </Box>
            </ConstruckModal>
            <ConstruckModal title="Archive asset" show={showArchiveModel} handleClose={handleClose}>
                <Typography
                   sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    Are you sure you want to archive{' '}
                    <span
                        style={{
                            fontWeight: '700',
                            color: '#282546'
                        }}
                    >
                        Truck (RAD 123 S)
                    </span>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            margin: '0px 10px',
                            borderRadius: '8px',
                            background: '#EDEFF2',
                            color:  '#64748A !important',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            background: '#1090CB',
                            color: '#FFF',
                            fontWeight: '500'


                        }}
                    >
                        Confirm
                    </Button>
                </Box>
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
                    Add asset
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
                    Assign asset
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
                    contents={<DataTable rows={data} columns={Columns(handleViewMore, handleEdit, handleArchive, handleDelete)} />}
                />
            </BodyContainer>

            {/* modal more info  */}
            <ConstruckModal title="Asset informatIon" show={showMoreInfo} handleClose={handleClose}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Asset Name</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                Truck
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Make/Model</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                Caterpillar
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Description </Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                Long Truck
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Year of Manufacture</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                2011
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Plate Number</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                RAD 456 A
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Assigned To</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                Angela UWASE
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Category</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                Trailer Truck
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Status</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: 'green'
                                }}
                            >
                                Available
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',

                                padding: '20px 0px'
                            }}
                        >
                            <Typography>Condition</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                New
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ConstruckModal>
        </Box>
    );
};

export default ProductsInternal;
