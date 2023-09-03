/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {Box, Grid, TextField} from '@mui/material';
import React, {} from 'react';
import {useFormik} from 'formik';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {validationSchema} from '../schema';
import SubmitButton from '../../../reusable/submit-button';
import {useDispatch, useSelector} from 'react-redux';
import DaaDAlerts from '../../../reusable/alerts';
import {styled} from '@mui/system';
import moment from 'moment';
import { CREATE_EXTERNAL_ASSET_REQUEST } from '../../../reducers/product/external/constant';
const StyledDateTextField = styled(TextField)({
    width: '100%',
    // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '33px' // You can adjust the padding as needed
    }
});
const CreateExternalAssetForm = (props) => {
    const dispatch = useDispatch();
    const {
        auth,
        createExternalAsset: {loading, message, success, error}
    } = useSelector((state) => state);

    const initialValues = {
        customerName: '',
        customerId: '',
        category: '',
        status: '',
        description: '',
        assetName: '',
        condition: '',
        manufacturedDate: '',
        duration: '',
        make: '',
        plateNumber: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                customerName: values.customerName,
                customerId: values.customerId,
                category: values.category,
                condition: values.condition,
                assetName: values.assetName,
                manufacturedDate: moment(values.manufacturedDate).format('YYYY-MM-DD'),
                description: values.description,
                status: 'AVAILABLE',
                duration: values.duration,
                make: values.make,
                plateNumber: values.plateNumber
            };
            dispatch({type: CREATE_EXTERNAL_ASSET_REQUEST, payload});
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
                                id="customerName"
                                name="customerName"
                                label="Customer Name"
                                value={formik.values.customerName}
                                onChange={formik.handleChange}
                                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                                helperText={formik.touched.customerName && formik.errors.customerName}
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
                                name="plateNumber"
                                label="Plate Number"
                                type="text"
                                value={formik.values.plateNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.plateNumber && Boolean(formik.errors.plateNumber)}
                                helperText={formik.touched.plateNumber && formik.errors.plateNumber}
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
                                id="make"
                                name="make"
                                label="Make Model"
                                type="text"
                                value={formik.values.make}
                                onChange={formik.handleChange}
                                error={formik.touched.make && Boolean(formik.errors.make)}
                                helperText={formik.touched.make && formik.errors.make}
                            />
                            
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        > <FormControl fullWidth>
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
                                    <MenuItem value="Bulldozers">Bulldozers</MenuItem>
                                    <MenuItem value="Excavators">Excavators</MenuItem>
                                    <MenuItem value="WheelLoaders"> Wheel Loaders</MenuItem>
                                    <MenuItem value="MotorGraders">Motor Graders</MenuItem>
                                    <MenuItem value="Backhoe">Backhoe</MenuItem>
                                    <MenuItem value="Loaders">Loaders</MenuItem>
                                    <MenuItem value="HeavyTrucks">Heavy Trucks</MenuItem>
                                    <MenuItem value="SoilCompactors">Soil Compactors</MenuItem>
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
                                    <MenuItem value="EXCELLENT">Excellent</MenuItem>
                                    <MenuItem value="GOOD">Good</MenuItem>
                                    <MenuItem value="POOR">Poor</MenuItem>
                                    <MenuItem value="UNDERMAINTENANCE">Under maintenance</MenuItem>
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
                                name="manufacturedDate"
                                type="date"
                                value={formik.values.manufacturedDate}
                                onChange={formik.handleChange}
                                error={formik.touched.manufacturedDate && Boolean(formik.errors.manufacturedDate)}
                                helperText={formik.touched.manufacturedDate && formik.errors.manufacturedDate}
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
                    <SubmitButton isLoading={loading} disabled={loading}>
                        Save
                    </SubmitButton>
                </Box>

                {error && <DaaDAlerts show={error} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default CreateExternalAssetForm;
