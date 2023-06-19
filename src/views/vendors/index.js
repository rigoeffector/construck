/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, {useEffect, useState} from 'react';
import BodyContainer from '../../reusable/container';
import {useFormik} from 'formik';
import DataTable from '../../reusable/table';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import {useDispatch, useSelector} from 'react-redux';
import {CREATE_VENDOR_REQUEST, DELETE_VENDOR_REQUEST, GET_VENDORS_LIST_REQUEST} from '../../reducers/vendors/constant';
import {CircularProgress} from '@mui/material';
import DaaDAlerts from '../../reusable/alerts';
import {columns} from './columns';
import AddNewButton from '../../reusable/actions-button/addnew';
import DaaDaModal from '../../reusable/modal';
import {initialState, validationSchema} from './schema';
import {Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@material-ui/core/TextField';
import SubmitButton from '../../reusable/submit-button';
import SweetAlert from 'react-bootstrap-sweetalert';
import UpdateVendorForm from './form/update.form';
export const keys = process.env.REACT_APP_ADDAX_API_KEY;
export default function Vendors() {
    const [thisState, setThisState] = useState(initialState);

    const dispatch = useDispatch();
    const {
        auth,
        listVendors: {loading, success, data},
        deleteVendor: {loading: deleteLoading, success: deleteSuccess},
        createVendor: {loading: createLoading, success: successCreate, message},
        updateVendor: {loading: updateLoading, success: updateSuccess, message: updateMessage}
    } = useSelector((state) => state);

    useEffect(() => {
        const payload = {
            entity_name: 'vendor',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys
        };

        dispatch({type: GET_VENDORS_LIST_REQUEST, payload});
    }, [auth?.data?.login_token, auth?.data?.username, dispatch]);

    const handleAddNewVendor = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: true
        }));
    };

    const handleClose = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: false,
            showAlertConfirm: false,
            showEditForm: false,
            editClicked: false,
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
            entity_name: 'vendor',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys,
            instance_id: row.uuid
        };

        dispatch({type: DELETE_VENDOR_REQUEST, payload});
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            email: '',
            contact_phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                entity_name: 'vendor',
                username: auth?.data?.username,
                login_token: auth?.data?.login_token,
                api_key: keys,
                details: {...values}
            };

            dispatch({type: CREATE_VENDOR_REQUEST, payload});
        }
    });
    useEffect(() => {
        if (successCreate || deleteSuccess || updateSuccess) {
            handleClose();
        }
    }, [deleteSuccess, successCreate, updateSuccess]);
    return (
        <BodyContainer>
            <SweetAlert
                warning
                show={thisState.showAlertConfirm}
                showCancel
                title={`Are you sure you want to delete this vendor information ?`}
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
            <DaaDaModal
                title={thisState.showEditForm ? 'Update Vendor Information' : 'Add New Vendor Information'}
                show={thisState.editClicked ? thisState.showEditForm : thisState.showAddNewModal}
                handleClose={handleClose}
            >
                {thisState.showEditForm ? (
                    <UpdateVendorForm thisState={thisState} />
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        margin: '4px 0px'
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        margin: '4px 0px'
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        margin: '4px 0px'
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="address"
                                        name="address"
                                        label="Address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        margin: '4px 0px'
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="contact_phone"
                                        name="contact_phone"
                                        label="Phone Number"
                                        value={formik.values.contact_phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.contact_phone && Boolean(formik.errors.contact_phone)}
                                        helperText={formik.touched.contact_phone && formik.errors.contact_phone}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <SubmitButton isLoading={createLoading}>Save</SubmitButton>
                        {message && !successCreate && <DaaDAlerts show={!successCreate} message={message} variant={'error'} />}
                    </form>
                )}
            </DaaDaModal>
            <DashBoardLayoutForPage
                title={'All Vendors Information'}
                actionButton={<AddNewButton title={'Add new'} onClick={handleAddNewVendor} />}
                contents={
                    loading ? (
                        <CircularProgress />
                    ) : success && data ? (
                        <DataTable rows={data || []} columns={columns(handleEdit, handleDelete)} />
                    ) : (
                        message && <DaaDAlerts show={!success} message={message} variant={'error'} />
                    )
                }
            />
            {!loading && successCreate && <DaaDAlerts show={successCreate} message={'Vendor is created successful'} variant={'success'} />}
            {!updateLoading && updateSuccess && (
                <DaaDAlerts show={updateSuccess} message={'Vendor is updated successful'} variant={'success'} />
            )}
        </BodyContainer>
    );
}
