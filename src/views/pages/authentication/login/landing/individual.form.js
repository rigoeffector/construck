/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {Box, CircularProgress, Grid, TextField} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {useDispatch, useSelector} from 'react-redux';
import {styled} from '@mui/system';
import moment from 'moment';
import DaaDAlerts from '../../../../../reusable/alerts';
import SubmitButton from '../../../../../reusable/submit-button';
import {COMPANY_REQUEST_ASSET_REQUEST, INDIVIDUAL_REQUEST_ASSET_REQUEST} from '../../../../../reducers/company/constant';
import {GET_ALL_TYPES_LIST_REQUEST} from '../../../../../reducers/product/constant';
import { validationSchemaIndiv } from './schema';
const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '30px' // You can adjust the padding as needed
    }
});
const IndividualRequestAssetForm = ({typesData}) => {
    const dispatch = useDispatch();

    const {
        individualRequestAsset: {loading, success, error, message}
    } = useSelector((state) => state);

    const initialValues = {
        requestorType: 'INDIVIDUAL',
        phoneNumber: '',
        email: '',
        idNumber: '',
        assetIds: '',
        from: '',
        to: '',
        purpose: '',
        firstName: '',
        lastName: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchemaIndiv,
        onSubmit: async (values, { resetForm }) => {
            const payload = {
                requestedBy: values.firstName + ' ' + values.lastName,
                requestorType: 'INDIVIDUAL',
                email: values.email,
                idNumber: values.idNumber,
                assetIds: [values.assetIds],
                from: moment(values.from).format('YYYY-MM-DD'),
                to: moment(values.to).format('YYYY-MM-DD'),
                purpose: values.purpose,
                phoneNumber: values.phoneNumber
            };

            console.log(payload);
            dispatch({type: INDIVIDUAL_REQUEST_ASSET_REQUEST, payload});
            resetForm();
        }
    });
    const filteredData = typesData.filter((item) => item.assetStatus === 'AVAILABLE');
    return (
        <div
            style={{
                width: '50%'
            }}
        >
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
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
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
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                type="text"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
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
                                type="text"
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
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone Number"
                                type="text"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                                id="idNumber"
                                name="idNumber"
                                label="Id Number"
                                type="text"
                                value={formik.values.idNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
                                helperText={formik.touched.idNumber && formik.errors.idNumber}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        >
                            <FormControl fullWidth>
                                <TextField
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Asset Name"
                                    name="assetIds"
                                    select
                                    value={formik.values.assetIds}
                                    onChange={formik.handleChange}
                                    error={formik.touched.assetIds && Boolean(formik.errors.assetIds)}
                                    helperText={formik.touched.assetIds && formik.errors.assetIds}
                                >
                                    {filteredData.map((type, i) => (
                                        <MenuItem value={type.id} key={i}>
                                            {type.assetName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        >
                            <StyledDateTextField
                                label="From"
                                name="from"
                                type="date"
                                value={formik.values.from}
                                onChange={formik.handleChange}
                                error={formik.touched.from && Boolean(formik.errors.from)}
                                helperText={formik.touched.from && formik.errors.from}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        >
                            <StyledDateTextField
                                label="To"
                                name="to"
                                type="date"
                                value={formik.values.to}
                                onChange={formik.handleChange}
                                error={formik.touched.to && Boolean(formik.errors.to)}
                                helperText={formik.touched.to && formik.errors.to}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        >
                            <TextField
                                fullWidth
                                id="purpose"
                                name="purpose"
                                label="Purpose"
                                multiline
                                minRows={3}
                                type="text"
                                value={formik.values.purpose}
                                onChange={formik.handleChange}
                                error={formik.touched.purpose && Boolean(formik.errors.purpose)}
                                helperText={formik.touched.purpose && formik.errors.purpose}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <SubmitButton isLoading={loading} disabled={loading} type="submit">
                        Request
                    </SubmitButton>
                </Box>

                {error && <DaaDAlerts show={error} message={error} variant={'error'} />}
                {success && <DaaDAlerts show={success} message={'Asset Requested Successful'} variant={'success'} />}
            </form>
        </div>
    );
};

export default IndividualRequestAssetForm;
