/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {thumb, thumbInner, validationCategorySchema} from '../schema';
import SubmitButton from '../../../reusable/submit-button';
import {Box, Button, Grid, TextField} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import DaaDAlerts from '../../../reusable/alerts';
import {useDropzone} from 'react-dropzone';
import {storage} from '../../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {img, thumbsContainer} from '../../assets/schema';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {v4} from 'uuid';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/system';
import {CREATE_INVOICE_REQUEST} from '../../../reducers/invoice/constant';
import moment from 'moment';

const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '30px' // You can adjust the padding as needed
    }
});
const CreateAssetInvoiceForm = ({moreInfo}) => {
    const dispatch = useDispatch();
    const initialValues = {
        clientRequestId: '',
        invoiceNumber: '',
        dueDate: '',
        description: '',
        amount: '',
        taxAmount: ''
    };
    const {
        createInvoice: {loading, success, message, error}
    } = useSelector((state) => state);
    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationCategorySchema,
        onSubmit: (values) => {
            const payload = {
                clientRequestId: moreInfo?.id,
                invoiceNumber: values.invoiceNumber,
                dueDate: moment(values.dueDate).format('YYYY-MM-DD'),
                description: values.description,
                amount: values.amount,
                taxAmount: values.taxAmount
            };

            dispatch({type: CREATE_INVOICE_REQUEST, payload});
        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                                value={moreInfo.requestedBy}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
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
                                id="invoiceNumber"
                                name="invoiceNumber"
                                label="Invoice Number"
                                value={formik.values.invoiceNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
                                helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
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
                                label="Due Date"
                                name="dueDate"
                                type="date"
                                value={formik.values.dueDate}
                                onChange={formik.handleChange}
                                error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                                helperText={formik.touched.to && formik.errors.dueDate}
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
                                id="description"
                                name="description"
                                label="Description"
                                multiline={true}
                                rows={4}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
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
                                id="amount"
                                name="amount"
                                label="Amount (RWF)"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                helperText={formik.touched.amount && formik.errors.amount}
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
                                id="taxAmount"
                                name="taxAmount"
                                label="Tax Amount (RWF)"
                                value={formik.values.taxAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.taxAmount && Boolean(formik.errors.taxAmount)}
                                helperText={formik.touched.taxAmount && formik.errors.taxAmount}
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
                        Save
                    </SubmitButton>
                </Box>

                {error  && <DaaDAlerts show={error} message={error} variant={'error'} />}
                {success  && <DaaDAlerts show={success} message={'Invoice Created Successful'} variant={'success'} />}
            </form>
        </div>
    );
};

export default CreateAssetInvoiceForm;
