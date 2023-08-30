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
import {CREATE_PRODUCT_REQUEST} from '../../../reducers/product/constant';
import DaaDAlerts from '../../../reusable/alerts';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import {storage} from '../../../firebase';
import { styled } from '@mui/system';
const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
  '& input[type="date"]': {
    padding: '10px', // You can adjust the padding as needed
  },
  });
const CreateExternalAssetForm = (props) => {
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
            // dispatch({type: CREATE_PRODUCT_REQUEST, payload});
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
                                id="name"
                                name="name"
                                label="Customer Name"
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
                                id="customerId"
                                name="customerId"
                                label="Customer Id"
                                type="text"
                                value={formik.values.customerId}
                                onChange={formik.handleChange}
                                error={formik.touched.customerId && Boolean(formik.errors.customerId)}
                                helperText={formik.touched.customerId && formik.errors.customerId}
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
                                id="assetName"
                                name="assetName"
                                label="Asset Name"
                                type="text"
                                value={formik.values.assetName}
                                onChange={formik.handleChange}
                                error={formik.touched.assetName && Boolean(formik.errors.assetName)}
                                helperText={formik.touched.assetName && formik.errors.assetName}
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
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
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
                                id="palteNumber"
                                name="plate"
                                label="Plate Number"
                                type="text"
                                value={formik.values.plate}
                                onChange={formik.handleChange}
                                error={formik.touched.plate && Boolean(formik.errors.plate)}
                                helperText={formik.touched.plate && formik.errors.plate}
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
                                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                                </TextField>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        >
                            <FormControl fullWidth>
                                <TextField
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Category"
                                    name="category"
                                    select
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                    helperText={formik.touched.category && formik.errors.category}
                                >
                                    <MenuItem value="1">Availabale </MenuItem>
                                    <MenuItem value="2">Unavailable </MenuItem>
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
                            <FormControl fullWidth>
                                <TextField
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Condition"
                                    name="condition"
                                    select
                                    value={formik.values.condition}
                                    onChange={formik.handleChange}
                                    error={formik.touched.condition && Boolean(formik.errors.condition)}
                                    helperText={formik.touched.condition && formik.errors.condition}
                                >
                                    <MenuItem value="1">New Truck</MenuItem>
                                    <MenuItem value="2">Old Truck</MenuItem>
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
                            <FormControl fullWidth>
                                <TextField
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Make/Model"
                                    name="model"
                                    select
                                    value={formik.values.model}
                                    onChange={formik.handleChange}
                                    error={formik.touched.model && Boolean(formik.errors.model)}
                                    helperText={formik.touched.model && formik.errors.model}
                                >
                                    <MenuItem value="1">Caterpillar</MenuItem>
                                    <MenuItem value="2">Daihatsu</MenuItem>
                                    <MenuItem value="2">Suzuki</MenuItem>
                                    <MenuItem value="2">Toyota</MenuItem>
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
     label="Year of manufacture"
      type="date"
      InputLabelProps={{
        shrink: true,
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
                            <TextField
                                fullWidth
                                id="duration"
                                name="duration"
                                label="Duration"
                                type="text"
                                value={formik.values.duration}
                                onChange={formik.handleChange}
                                error={formik.touched.duration && Boolean(formik.errors.duration)}
                                helperText={formik.touched.duration && formik.errors.duration}
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
                    <SubmitButton isLoading={loading} disabled={''}>
                        Save
                    </SubmitButton>
                   
                </Box>

                {message && !success && <DaaDAlerts show={!success} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default CreateExternalAssetForm;
