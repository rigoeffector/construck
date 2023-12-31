/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {Box, CircularProgress, Grid, TextField} from '@mui/material';
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
import {GET_DRIVERS_LIST_REQUEST} from '../../../reducers/drivers/constant';
const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '30px' // You can adjust the padding as needed
    }
});
const CreateAssetForm = ({drivers}) => {
    const dispatch = useDispatch();

    const {
        createInternalAsset: {loading, success, error, message}
    } = useSelector((state) => state);

    const initialValues = {
        plateNumber: '',
        assetName: '',
        category: '',
        description: '',
        make: '',
        condition: '',
        driverId: '',
        manufacturedDate: ''
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {
                assetName: values.assetName,
                description: values.description,
                category: values.category,
                condition: values.condition,
                plateNumber: values.plateNumber,
                driverId: values.driverId,
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
                                InputLabelProps={{
                                    shrink: true,
                                     // Add red color to the label
                                }}
                                label={
                                    <div>
                                        Asset Name <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                    </div>
                                }
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
                                InputLabelProps={{
                                    shrink: true,
                                     // Add red color to the label
                                }}
                                label={
                                    <div>
                                        Description <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                    </div>
                                }
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
                                InputLabelProps={{
                                    shrink: true,
                                     // Add red color to the label
                                }}
                                label={
                                    <div>
                                        Plate Number <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                    </div>
                                }
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
                                    InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            Driver Names <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
                                    name="driverId"
                                    select
                                    value={formik.values.driverId}
                                    onChange={formik.handleChange}
                                    error={formik.touched.driverId && Boolean(formik.errors.driverId)}
                                    helperText={formik.touched.driverId && formik.errors.driverId}
                                >
                                    {drivers.map((driver, i) => (
                                        <MenuItem value={driver?.id} key={i}>{`${driver?.firstName} ${driver?.lastName}`}</MenuItem>
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
                                            Category <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                                    InputLabelProps={{
                                        shrink: true,
                                         // Add red color to the label
                                    }}
                                    label={
                                        <div>
                                            Condition <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                        </div>
                                    }
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
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        >
                            <TextField
                                fullWidth
                                id="make"
                                name="make"
                                InputLabelProps={{
                                    shrink: true,
                                     // Add red color to the label
                                }}
                                label={
                                    <div>
                                        Make/Model <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                    </div>
                                }
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
                                InputLabelProps={{
                                    shrink: true,
                                     // Add red color to the label
                                }}
                                label={
                                    <div>
                                        Year of manufacture <span style={{color: 'red', fontSize: '20px'}}>*</span>
                                    </div>
                                }
                                name="manufacturedDate"
                                type="date"
                                value={formik.values.manufacturedDate}
                                onChange={formik.handleChange}
                                error={formik.touched.manufacturedDate && Boolean(formik.errors.manufacturedDate)}
                                helperText={formik.touched.manufacturedDate && formik.errors.manufacturedDate}
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
