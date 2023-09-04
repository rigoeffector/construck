/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */

/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import {Columns} from './table-column';
import {Box, CircularProgress, Grid} from '@mui/material';
import {DataTable} from '../../reusable/table';
import {useDispatch, useSelector} from 'react-redux';
import {initialState} from './schema';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ConstruckModal from '../../reusable/modal';
import CreateAssetForm from './form/create.asset.form';
import AssignInternalAssetForm from './form/assign.internal';
import {
    DELETE_INTERNAL_ASSET_REQUEST,
    GET_INTERNAL_ASSETS_LIST_REQUEST,
    UPDATE_INTERNAL_ASSET_STATUS_REQUEST
} from '../../reducers/product/constant';
import moment from 'moment';
import DaaDAlerts from '../../reusable/alerts';
import EditInternalAssetForm from './form/edit.internal.asset.form';
const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const ProductsInternal = (props) => {
    const {
        auth,
        createInternalAsset: {success: createInternalAssetSuccess},
        listInternalAllAssets: {data: listInternalAllAssets, loading: listInternalAllAssetsLoading},
        deleteInternalAsset: {loading: deleteLoading, message: deleteMessage, success: deleteSuccess},
        updateInternalAssetStatus: {
            loading: updateStatusLoading,
            success: updateStatusSuccess,
            message: updateStatusMessage,
            error: updateStatusError
        }
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_INTERNAL_ASSETS_LIST_REQUEST,
            payload: {
                status: '',
                name: ''
            }
        });
    }, [dispatch]);

    useEffect(() => {
        if (createInternalAssetSuccess || deleteSuccess || updateStatusSuccess) {
            handleClose();
        }
    }, [createInternalAssetSuccess, deleteSuccess, updateStatusSuccess]);
    const [showNewModal, setShowNewModal] = useState(false);
    const [thisState, setThisState] = useState(initialState);
    const [showAssignModel, setShowAssignModal] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showArchiveModel, setShowArchiveModel] = useState(false);
    const [showEditInternalModal, setShowEditInternalModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Assign asset');
    const [selectionModel, setSelectionModel] = useState({});
    const handleClose = () => {
        setShowNewModal(false);
        setShowAssignModal(false);
        setShowDeleteModel(false);
        setShowMoreInfo(false);
        setShowArchiveModel(false);
        setShowEditInternalModal(false);
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

    const handleArchiveConfirm = () => {
        const payload = {
            status: 'ARCHIVED',
            id: thisState.moreInfo.id
        };
        dispatch({type: UPDATE_INTERNAL_ASSET_STATUS_REQUEST, payload});
    };

    const handleEdit = (data) => {
        setShowEditInternalModal(true);
        setThisState((prev) => ({
            ...prev,
            moreInfo: data
        }));
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
        dispatch({type: DELETE_INTERNAL_ASSET_REQUEST, payload});
    };
    return (
        <Box>
            <ConstruckModal title="Add asset" show={showNewModal} handleClose={handleClose}>
                <CreateAssetForm />
            </ConstruckModal>
            <ConstruckModal title={modalTitle} show={showAssignModel} handleClose={handleClose}>
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
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleShowAddNew}
                    sx={{
                        borderRadius: '8px',
                        background: '#1090CB',
                        
                    }}
                >
                    Add asset
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
                    Assign asset
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

            {/* EDIT MODALS  */}
            <ConstruckModal title="Edit asset" show={showEditInternalModal} handleClose={handleClose}>
                <EditInternalAssetForm assetData={thisState.moreInfo} />
            </ConstruckModal>
            <BodyContainer>
                {createInternalAssetSuccess && (
                    <DaaDAlerts show={createInternalAssetSuccess} message={'Asset created successful'} variant={'success'} />
                )}
                {updateStatusSuccess && (
                    <DaaDAlerts show={updateStatusSuccess} message={'Asset Status is updated successful'} variant={'success'} />
                )}

                <DashBoardLayoutForPage
                    title={''}
                    actionButton={''}
                    contents={
                        <DataTable
                            columns={Columns(handleViewMore, handleEdit, handleArchive, handleDelete)}
                            rows={listInternalAllAssets || []}
                            rowsPerPageOptions={['5', '10', '15', '30', '100']}
                            selectionModel={selectionModel}
                            loader={listInternalAllAssetsLoading}
                        />
                    }
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
                                {thisState.moreInfo?.assetName}
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
                                {thisState.moreInfo?.make}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'block',

                                borderBottom: '1px solid #ddd',
                                padding: '20px 0px'
                            }}
                        >
                            <Box
                                item
                                xs={12}
                                sx={{
                                    margin: '20px 0px'
                                }}
                            >
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
                                {moment(thisState.moreInfo?.manufacturedDate).format('DD/MM/YYYY')}
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
                                {thisState.moreInfo?.plateNumber}
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
                                {thisState.moreInfo?.assignedTo}
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
                                {thisState.moreInfo?.category}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                // borderBottom: '1px solid #ddd',
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
                                {thisState.moreInfo?.assetStatus}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
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
                                {thisState.moreInfo?.condition}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ConstruckModal>
        </Box>
    );
};

export default ProductsInternal;
