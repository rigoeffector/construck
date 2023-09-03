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
const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px' // You can adjust the padding as needed
    }
});
const CreateNewDriverForm = (props) => {
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
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
                                id="driverName"
                                name="driverName"
                                label="Driver Name"
                                value={formik.values.driverName}
                                onChange={formik.handleChange}
                                error={formik.touched.driverName && Boolean(formik.errors.driverName)}
                                helperText={formik.touched.driverName && formik.errors.driverName}
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
                                id="driverId"
                                name="driverId"
                                label="Driver Id"
                                value={formik.values.driverId}
                                onChange={formik.handleChange}
                                error={formik.touched.driverId && Boolean(formik.errors.driverId)}
                                helperText={formik.touched.driverId && formik.errors.driverId}
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
                                id="phone"
                                name="phone"
                                label="Phone Number"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
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
                                    label="Status"
                                    name="status"
                                    select
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    error={formik.touched.status && Boolean(formik.errors.status)}
                                    helperText={formik.touched.status && formik.errors.status}
                                >
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Unavailable">UnAvailable</MenuItem>
                                    <MenuItem value="Unavailable">Online</MenuItem>
                                </TextField>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <SubmitButton isLoading={loading} disabled={''}>
                        Save
                    </SubmitButton>
                </Box>

                {message && !success && <DaaDAlerts show={!success} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default CreateNewDriverForm;
