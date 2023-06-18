/* eslint-disable no-unused-vars */

import React, {useEffect, useState} from 'react';
import BodyContainer from '../../reusable/container';
import {useFormik} from 'formik';
import * as yup from 'yup';
import DataTable from '../../reusable/table';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import {useDispatch, useSelector} from 'react-redux';
import {CREATE_VENDOR_REQUEST, GET_VENDORS_LIST_REQUEST} from '../../reducers/vendors/constant';
import {CircularProgress} from '@mui/material';
import DaaDAlerts from '../../reusable/alerts';
import {columns} from './columns';
import AddNewButton from '../../reusable/actions-button/addnew';
import DaaDaModal from '../../reusable/modal';
import {initialState} from './schema';
import {Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@material-ui/core/TextField';
import SubmitButton from '../../reusable/submit-button';
const keys = process.env.REACT_APP_ADDAX_API_KEY;
export default function Vendors() {
    const [thisState, setThisState] = useState(initialState);

    const dispatch = useDispatch();
    const {
        auth,
        listVendors: {loading, success, data},
        createVendor: {loading: createLoading, success: successCreate, message}
    } = useSelector((state) => state);

    useEffect(() => {
        const payload = {
            entity_name: 'vendor',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys
        };
        debugger;
        dispatch({type: GET_VENDORS_LIST_REQUEST, payload});
    }, [auth?.data?.login_token, auth?.data?.username, dispatch]);

    const handleAddNewVendor = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: true
        }));
    };
    const validationSchema = yup.object({
        name: yup.string('Enter vendor name').min(2, 'Vendor name be of minimum 8 characters length').required('Vendor name is required'),
        address: yup.string('Enter vendor address').required('Vendor address is required'),
        contact_phone: yup.string('Enter vendor phone number').required('Vendor phone number is required'),
        email: yup.string('Enter vendor email').required('Vendor email is required')
    });
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

    const handleClose = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: false
        }));
    };

    useEffect(() => {
        if (successCreate) {
            handleClose();
        }
    }, [successCreate]);
    return (
        <BodyContainer>
            <DaaDaModal title={'Add New Vendor'} show={thisState.showAddNewModal} handleClose={handleClose}>
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
            </DaaDaModal>
            <DashBoardLayoutForPage
                title={'All Vendors Information'}
                actionButton={<AddNewButton title={'Add new'} onClick={handleAddNewVendor} />}
                contents={
                    loading ? (
                        <CircularProgress />
                    ) : success && data ? (
                        <DataTable rows={data} columns={columns} />
                    ) : (
                        message && <DaaDAlerts show={!success} message={message} variant={'error'} />
                    )
                }
            />
            {!loading && successCreate && <DaaDAlerts show={successCreate} message={'Vendor is created successful'} variant={'success'} />}
        </BodyContainer>
    );
}
