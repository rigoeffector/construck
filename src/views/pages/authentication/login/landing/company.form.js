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
import {COMPANY_REQUEST_ASSET_REQUEST} from '../../../../../reducers/company/constant';
import {GET_ALL_TYPES_LIST_REQUEST} from '../../../../../reducers/product/constant';
const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '30px' // You can adjust the padding as needed
    }
});
const CompanyRequestAssetForm = ({typesData}) => {
    const dispatch = useDispatch();

    const {
        companyRequestAsset: {loading, success, error, message}
    } = useSelector((state) => state);


    const initialValues = {
        requestedBy: '',
        requestorType: '',
        phoneNumber: '',
        email: '',
        tinNumber: '',
        idNumber: '',
        assetIds: [],
        from: '',
        to: '',
        purpose: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                requestedBy: values.requestedBy,
                requestorType: 'COMPANY',
                phoneNumber: values.phoneNumber,
                email: values.email,
                tinNumber: values.tinNumber,
                idNumber: values.idNumber,
                assetIds: [values.assetIds],
                from: values.from,
                to: values.to,
                purpose: values.purpose
            };

            console.log(payload);
            dispatch({type: COMPANY_REQUEST_ASSET_REQUEST, payload});
        }
    });

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
                                id="requestedBy"
                                name="requestedBy"
                                label="Company Name"
                                value={formik.values.requestedBy}
                                onChange={formik.handleChange}
                                error={formik.touched.requestedBy && Boolean(formik.errors.requestedBy)}
                                helperText={formik.touched.requestedBy && formik.errors.requestedBy}
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
                                id="email"
                                name="email"
                                label="Company Email"
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
                                id="tinNumber"
                                name="tinNumber"
                                label="Tin Number"
                                type="text"
                                value={formik.values.tinNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.tinNumber && Boolean(formik.errors.tinNumber)}
                                helperText={formik.touched.tinNumber && formik.errors.tinNumber}
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
                                    {typesData.map((type, i) => (
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

                    <Grid item xs={12}>
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

export default CompanyRequestAssetForm;
