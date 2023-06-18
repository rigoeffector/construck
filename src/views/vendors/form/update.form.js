import React from 'react';
import {useFormik} from 'formik';
import {validationSchema} from '../schema';
import {useDispatch, useSelector} from 'react-redux';
import {keys} from '..';
import {UPDATE_VENDOR_REQUEST} from '../../../reducers/vendors/constant';
import SubmitButton from '../../../reusable/submit-button';
import {Box, Grid, TextField} from '@mui/material';
import DaaDAlerts from '../../../reusable/alerts';

const UpdateVendorForm = ({thisState}) => {
    const dispatch = useDispatch();

    const {
        auth,
        updateVendor: {loading, message, success}
    } = useSelector((state) => state);
    const formik = useFormik({
        initialValues: {
            name: thisState.editRow.name,
            address: thisState.editRow.address,
            email: thisState.editRow.email,
            contact_phone: thisState.editRow.contact_phone
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                entity_name: 'vendor',
                username: auth?.data?.username,
                login_token: auth?.data?.login_token,
                instance_id: thisState.editRow.uuid,
                api_key: keys,
                details: {...values}
            };

            dispatch({type: UPDATE_VENDOR_REQUEST, payload});
        }
    });
    return (
        <div>
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

                <SubmitButton isLoading={loading}>Update</SubmitButton>
                {message && !success && <DaaDAlerts show={!success} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default UpdateVendorForm;
