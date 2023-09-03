/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {Box, Grid, TextField} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {validationSchema} from '../schema';
import SubmitButton from '../../../reusable/submit-button';
import {useDispatch, useSelector} from 'react-redux';
import {styled} from '@mui/system';
import {CREATE_INTERNAL_ASSET_REQUEST} from '../../../reducers/product/constant';
import moment from 'moment';
import DaaDAlerts from '../../../reusable/alerts';
const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '30px' // You can adjust the padding as needed
    }
});
const CreateAssetForm = (props) => {
    const dispatch = useDispatch();

    const {
        createInternalAsset: {loading, success, error, message}
    } = useSelector((state) => state);

    const initialValues = {
        plate: '',
        assetName: '',
        category: '',
        status: '',
        description: '',
        make: '',
        condition: '',
        manufacturedDate: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                assetName: values.assetName,
                description: values.description,
                category: values.category,
                condition: values.condition,
                plateNumber: values.plateNumber,
                manufacturedDate: moment(values.manufacturedDate).format('YYYY-MM-DD'),
                make: values.make,
                status: 'AVAILABLE'
            };

    
            dispatch({type: CREATE_INTERNAL_ASSET_REQUEST, payload});
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
                                id="assetName"
                                name="assetName"
                                label="Asset Name"
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
                                id="plateNumber"
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
                            <TextField
                                fullWidth
                                id="make"
                                name="make"
                                label="Make/Model"
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

                {error && <DaaDAlerts show={error} message={error} variant={'error'} />}
            </form>
        </div>
    );
};

export default CreateAssetForm;
