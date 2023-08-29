/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import {Box, Grid, TextField} from '@mui/material';
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
// import {keys} from '../../vendors';
import {CREATE_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST} from '../../../reducers/product/constant';
import DaaDAlerts from '../../../reusable/alerts';
const EditProductForm = (props) => {
    const dispatch = useDispatch();
    const {listVendors, listCategories, productData} = props;
    const [files, setFiles] = useState([]);
    const {
        auth,
        updateProduct: {loading, message, success}
    } = useSelector((state) => state);
    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);
    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 5,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg']
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));
    const formik = useFormik({
        initialValues: {
            name: productData.name,
            unit_price: productData.unit_price,
            quantity: productData.quantity,
            category: productData.category,
            description: productData.description,
            images: '',
            vendor: productData.vendor
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // const payload = {
            //     entity_name: 'product',
            //     username: auth?.data?.username,
            //     login_token: auth?.data?.login_token,
            //     instance_id: productData?.uuid,
            //     api_key: keys,
            //     details: {
            //         ...values
            //     }
            // };
            // dispatch({type: UPDATE_PRODUCT_REQUEST, payload});
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
                                label="Name"
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
                                id="price"
                                name="unit_price"
                                label="Price"
                                type="number"
                                value={formik.values.unit_price}
                                onChange={formik.handleChange}
                                error={formik.touched.unit_price && Boolean(formik.errors.unit_price)}
                                helperText={formik.touched.unit_price && formik.errors.unit_price}
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
                                    label="Categories"
                                    name="category"
                                    select
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                    helperText={formik.touched.category && formik.errors.category}
                                >
                                    {listCategories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
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
                            <TextField
                                fullWidth
                                id="quantity"
                                name="quantity"
                                label="quantity"
                                type="number"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                helperText={formik.touched.quantity && formik.errors.quantity}
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
                                id="vendor"
                                name="vendor"
                                select
                                label="Vendors"
                                type="text"
                                value={formik.values.vendor}
                                onChange={formik.handleChange}
                                error={formik.touched.vendor && Boolean(formik.errors.vendor)}
                                helperText={formik.touched.vendor && formik.errors.vendor}
                            >
                                {listVendors.map((vendor) => (
                                    <MenuItem key={vendor?.id} value={vendor?.id}>
                                        {vendor?.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sx={12}
                        style={{
                            width: '100%',
                            border: '3px solid #ddd',
                            borderRadius: '10px',
                            margin: '10px 0px 4px 18px',
                            borderStyle: 'dashed'
                        }}
                    >
                        <Box
                            sx={{
                                margin: '4px 0px'
                            }}
                        >
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <p>Drag and drop some images files here, or click to select files </p>
                                <em>(5 files are the maximum number of files you can drop here)</em>
                                <IconButton aria-label="delete">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                            <aside style={thumbsContainer}>{thumbs}</aside>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                margin: '0px 0px'
                            }}
                        >
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                label="Description"
                                multiline={true}
                                rows={2}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <SubmitButton isLoading={loading}>Update</SubmitButton>
                {message && !success && <DaaDAlerts show={!success} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default EditProductForm;
