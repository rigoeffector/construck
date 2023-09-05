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
import {validationSchema} from './schema';
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
        phoneNumber: '',
        email: '',
        tinNumber: '',
        assetIds: '',
        from: '',
        to: '',
        purpose: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, {resetForm}) => {
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
                {error && <DaaDAlerts show={error} message={error} variant={'Request failed, try again'} />}
                {success && <DaaDAlerts show={success} message={'Asset Requested Successful'} variant={'success'} />}
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
                                InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            Company Name <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            Phone Number <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            Company Email <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            TIN Number <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                    InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            Asset Name <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                
                                name="from"
                                type="date"
                                value={formik.values.from}
                                onChange={formik.handleChange}
                                error={formik.touched.from && Boolean(formik.errors.from)}
                                helperText={formik.touched.from && formik.errors.from}
                                InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            From <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                
                                name="to"
                                type="date"
                                value={formik.values.to}
                                onChange={formik.handleChange}
                                error={formik.touched.to && Boolean(formik.errors.to)}
                                helperText={formik.touched.to && formik.errors.to}
                                InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            To <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            Purpose <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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

            </form>
        </div>
    );
};

export default CompanyRequestAssetForm;
