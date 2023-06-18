/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import AddNewButton from '../../reusable/actions-button/addnew';
import {DaaDaModal} from '../../reusable/modal';
import {columns} from './table-column';
import {useFormik} from 'formik';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {useDropzone} from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import {Box} from '@mui/material';
import Grid from '@mui/material/Grid';
import SubmitButton from '../../reusable/submit-button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {DataTable} from '../../reusable/table';
import {rows} from './table-column/row';

const initialState = {
    showAddNewModal: false
};
export const Products = (props) => {
    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };
    const [thisState, setThisState] = useState(initialState);
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 10,
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
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    const handleAddNewProduct = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: true
        }));
    };
    const handleClose = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: false
        }));
    };

    const validationSchema = yup.object({
        name: yup
            .string('Enter product name')
            .min(2, 'Product name be of minimum 8 characters length')
            .required('Product name is required'),
        price: yup.string('Enter product price').required('Product price is required'),
        quantity: yup.string('Enter product quantity').required('Product quantity is required'),
        category: yup.string('Choose product category').required('Product category is required'),
        vendor: yup.string('Choose product vendor').required('Product vendor is required'),
        description: yup.string('Enter product description').required('Product description is required'),
        images: yup.string('Choose product images').required('Product images are required')
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            category: '',
            description: '',
            images: '',
            vendor: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <BodyContainer>
            <DaaDaModal title={'Add New Product'} show={thisState.showAddNewModal} handleClose={handleClose}>
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
                                    name="price"
                                    label="Price"
                                    type="number"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
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
                                        <MenuItem value={10}>Fruits</MenuItem>
                                        <MenuItem value={20}>Drinks</MenuItem>
                                        <MenuItem value={30}>Meal</MenuItem>
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
                                    <MenuItem value={10}>Java House</MenuItem>
                                    <MenuItem value={20}>Riders</MenuItem>
                                    <MenuItem value={30}>The Shouters</MenuItem>
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
                                    <em>(10 files are the maximum number of files you can drop here)</em>
                                    <IconButton aria-label="delete">
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </div>
                                <aside style={thumbsContainer}>{thumbs}</aside>
                            </Box>
                        </Grid>
                    </Grid>

                    <SubmitButton isLoading={false}>Save</SubmitButton>
                </form>
            </DaaDaModal>
            <DashBoardLayoutForPage
                title={'All Products'}
                actionButton={<AddNewButton title={'Add new'} onClick={handleAddNewProduct} />}
                contents={<DataTable rows={rows} columns={columns} />}
            />
        </BodyContainer>
    );
};

export default Products;
