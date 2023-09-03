/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {Box, Button, Grid, TextField} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {useDropzone} from 'react-dropzone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {img, thumb, thumbInner, thumbsContainer, validationSchema} from '../schema';
import SubmitButton from '../../../reusable/submit-button';
import {useDispatch, useSelector} from 'react-redux';
import {CREATE_INTERNAL_ASSET_REQUEST} from '../../../reducers/product/constant';
import DaaDAlerts from '../../../reusable/alerts';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import {storage} from '../../../firebase';
import {styled} from '@mui/system';
import CancelButton from '../../../reusable/submit-button/cancel';
const StyledDateTextField = styled(TextField)({
    width: '100%', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '30px' // You can adjust the padding as needed
    }
});
const InvoiceInternalAssetForm = (props) => {
    const dispatch = useDispatch();

    const {listVendors, listCategories} = props;
    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [loadingUpload, setLoadingUpload] = useState(false);
    const {
        auth,
        createProduct: {loading, message, success}
    } = useSelector((state) => state);
    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);
    const [showInvoice, setShowInvoice] = useState(false);

    const handleShowInvoice = (date) => {
        setShowInvoice(date);
    };

    const initialValues = {
        plate: '',
        name: '',
        category: '',
        status: '',
        description: '',
        model: '',
        condition: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // const payload = {
            //     entity_name: 'product',
            //     username: auth?.data?.username,
            //     login_token: auth?.data?.login_token,
            //     api_key: keys,
            //     details: {
            //         ...values,
            //         ...imageUrls
            //     }
            // };
            // dispatch({type: CREATE_INTERNAL_ASSET_REQUEST, payload});
            // setImageUrls({});
        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} for>
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
                                value={formik.values.name}
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
                                id="name"
                                name="invoiceNumber"
                                label="Invoice Number"
                                value={formik.values.invoiceNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
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
                                type="date"
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
                                id="name"
                                name="description"
                                label="Description"
                                multiline
                                minRows={3}
                                value={formik.values.invoiceNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
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
                                id="name"
                                name="amount"
                                label="Amount"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'baseline'
                    }}
                >
                    <CancelButton title={'Cancel'} action={''}></CancelButton>
                    <Button
                        sx={{
                            background: '#1090CB',
                            marginTop: '2rem',
                            color: 'white',
                            display: 'flex',
                            height: '45px',
                            padding: '2px 0px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexShrink: '0',
                            borderRadius: '8px',
                            '&:hover': {
                                background: '#1090CB'
                            }
                        }}
                    >
                        Save
                    </Button>
                </Box>

                {message && !success && <DaaDAlerts show={!success} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default InvoiceInternalAssetForm;
