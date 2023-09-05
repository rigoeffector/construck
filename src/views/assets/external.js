/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */

/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import {columns} from './table-column';
import {Box, CircularProgress, Grid} from '@mui/material';
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
import {
    DELETE_EXTERNAL_ASSET_REQUEST,
    GET_EXTERNAL_ASSETS_LIST_REQUEST,
    UPDATE_EXTERNAL_ASSET_STATUS_REQUEST
} from '../../reducers/product/external/constant';
import DaaDAlerts from '../../reusable/alerts';
import moment from 'moment';
const keys = process.env.REACT_APP_ADDAX_API_KEY;
export const ProductsExternal = (props) => {
    const dispatch = useDispatch();
    const {
        auth,
        createExternalAsset: {success: createExternalAssetSuccess},
        listExternalAllAssets: {data: listExternalAllAssets, loading: listExternalAllAssetsLoading},
        deleteExternalAsset: {loading: deleteLoading, message: deleteMessage, success: deleteSuccess},
        updateExternalAssetStatus: {
            loading: updateStatusLoading,
            success: updateStatusSuccess,
            message: updateStatusMessage,
            error: updateStatusError
        }
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch({
            type: GET_EXTERNAL_ASSETS_LIST_REQUEST
        });
    }, [dispatch]);
    useEffect(() => {
        if (createExternalAssetSuccess || deleteSuccess || updateStatusSuccess) {
            handleClose();
        }
    }, [createExternalAssetSuccess, deleteSuccess, updateStatusSuccess]);
    const [showNewModal, setShowNewModal] = useState(false);
    const [thisState, setThisState] = useState(initialState);
    const [showAssignModel, setShowAssignModal] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showArchiveModel, setShowArchiveModel] = useState(false);
    const [showAvailableModel, setShowAvailableModel] = useState(false);

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
        setShowAvailableModel(false);

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

    const handleViewMore = (data) => {
        setThisState((prev) => ({
            ...prev,
            moreInfo: data
        }));
        setShowMoreInfo(true);
    };

    const handleArchive = (data) => {
        setShowArchiveModel(true);
        setThisState((prev) => ({
            ...prev,
            moreInfo: data
        }));
    };
    const handleAvailable = (data) => {
        setShowAvailableModel(true);
        setThisState((prev) => ({
            ...prev,
            moreInfo: data
        }));
    };

    const handleArchiveConfirm = () => {
        const payload = {
            status: 'ARCHIVED',
            id: thisState.moreInfo.id
        };
        dispatch({type: UPDATE_EXTERNAL_ASSET_STATUS_REQUEST, payload});
    };
    const handleAvailableConfirm = () => {
        const payload = {
            status: 'AVAILABLE',
            id: thisState.moreInfo.id
        };
        dispatch({type: UPDATE_EXTERNAL_ASSET_STATUS_REQUEST, payload});
    };
    const handleEdit = () => {
        console.log('Edit');
    };

    const handleDelete = (data) => {
        setThisState((prev) => ({
            ...prev,
            moreInfo: data
        }));
        setShowDeleteModel(true);
    };

    const handleDeleteConfirm = () => {
        const payload = {
            id: thisState.moreInfo.id
        };
        dispatch({type: DELETE_EXTERNAL_ASSET_REQUEST, payload});
    };
    return (
        <Box>
            <ConstruckModal title="Add external asset" show={showNewModal} handleClose={handleClose}>
                <CreateExternalAssetForm />
            </ConstruckModal>
            <ConstruckModal title="Assign  external asset" show={showAssignModel} handleClose={handleClose}>
                <AssignExternalAssetForm />
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
                        {`${thisState.moreInfo.assetName} (${thisState.moreInfo.plateNumber})`}
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
                            color: '#64748A !important',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            background: '#1090CB',
                            color: '#FFF',
                            fontWeight: '500'
                        }}
                    >
                        {deleteLoading ? (
                            <CircularProgress
                                size={20}
                                sx={{
                                    color: 'white'
                                }}
                            />
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </Box>
            </ConstruckModal>
            <ConstruckModal title="Archive asset" show={showArchiveModel} handleClose={handleClose}>
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
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
                        {` ${thisState.moreInfo.assetName} (${thisState.moreInfo.plateNumber})`}
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
                            color: '#64748A !important',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleArchiveConfirm}
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            background: '#1090CB',
                            color: '#FFF',
                            fontWeight: '500'
                        }}
                    >
                        {updateStatusLoading ? (
                            <CircularProgress
                                size={20}
                                sx={{
                                    color: 'white'
                                }}
                            />
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </Box>
            </ConstruckModal>
            <ConstruckModal title="Mark asset" show={showAvailableModel} handleClose={handleClose}>
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    Are you sure you want to mark as available{' '}
                    <span
                        style={{
                            fontWeight: '700',
                            color: '#282546'
                        }}
                    >
                        {` ${thisState.moreInfo.assetName} (${thisState.moreInfo.plateNumber})`}
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
                            color: '#64748A !important',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleAvailableConfirm}
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            background: '#1090CB',
                            color: '#FFF',
                            fontWeight: '500'
                        }}
                    >
                        {updateStatusLoading ? (
                            <CircularProgress
                                size={20}
                                sx={{
                                    color: 'white'
                                }}
                            />
                        ) : (
                            'Confirm'
                        )}
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
                    Add external asset
                </Button>
                {/* <Button
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
                </Button> */}
                {/* <Button
                    variant="outlined"
                    endIcon={<SystemUpdateAltIcon />}
                    sx={{
                        borderRadius: '8px',
                        marginRight: '15px',
                        border: ' 1px solid #1090CB'
                    }}
                >
                    Bulk import
                </Button> */}
            </Grid>

            <BodyContainer>
                {createExternalAssetSuccess && (
                    <DaaDAlerts show={createExternalAssetSuccess} message={'External Asset is created successful'} variant={'success'} />
                )}
                <DashBoardLayoutForPage
                    title={''}
                    actionButton={''}
                    contents={
                        <DataTable
                            rows={listExternalAllAssets || []}
                            loader={listExternalAllAssetsLoading}
                            enabledFilters={false}
                            columns={Columns(handleViewMore, handleEdit, handleArchive, handleDelete, handleAvailable)}
                        />
                    }
                />
            </BodyContainer>

            {/* modal more info  */}
            <ConstruckModal title="Asset informatIon" show={showMoreInfo} handleClose={handleClose}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Customer Name</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {thisState.moreInfo?.customerName}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Customer ID</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {thisState.moreInfo?.customerId}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'block',

                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Box item xs={12}>
                                <Typography>Description </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {thisState.moreInfo?.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Year of Manufacture</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moment(thisState.moreInfo?.manufacturedDate).format('DD/MM/YYYY')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Plate Number</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {thisState.moreInfo?.plateNumber}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Make/Model</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {thisState.moreInfo?.make}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Category</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {thisState.moreInfo?.category}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Status</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: 'green'
                                }}
                            >
                                {thisState.moreInfo?.assetStatus}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Name</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: 'green'
                                }}
                            >
                                {thisState.moreInfo?.assetName}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',

                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Condition</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {thisState.moreInfo?.condition}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ConstruckModal>
        </Box>
    );
};

export default ProductsExternal;
