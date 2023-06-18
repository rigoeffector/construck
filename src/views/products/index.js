/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import BodyContainer from '../../reusable/container';
import AddNewButton from '../../reusable/actions-button/addnew';
import {DaaDaModal} from '../../reusable/modal';
import {columns} from './table-column';
import {useFormik} from 'formik';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {useDropzone} from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import {Box, Skeleton} from '@mui/material';
import Grid from '@mui/material/Grid';
import SubmitButton from '../../reusable/submit-button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {DataTable} from '../../reusable/table';
import {rows} from './table-column/row';
import {useDispatch, useSelector} from 'react-redux';
import {GET_VENDORS_LIST_REQUEST} from '../../reducers/vendors/constant';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {img, initialState, thumb, thumbInner, thumbsContainer, validationSchema} from './schema';
import CreateProductCategoryForm from './form/create.category.form';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}
const keys = process.env.REACT_APP_ADDAX_API_KEY;

export const Products = (props) => {
    const {
        auth,
        listVendors: {data: listVendors, loading: listVendorsLoading}
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        const payload = {
            entity_name: 'vendor',
            username: auth?.data?.username,
            login_token: auth?.data?.login_token,
            api_key: keys
        };

        dispatch({type: GET_VENDORS_LIST_REQUEST, payload});
    }, []);
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
    const handleAddNewCategory = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewCategoryModal: true,
            addCategoryClicked: true
        }));
    };
    const handleClose = () => {
        setThisState((prev) => ({
            ...prev,
            showAddNewModal: false,
            showAddNewCategoryModal: false,
            addCategoryClicked: false
        }));
    };

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <BodyContainer>
            <DaaDaModal
                title={thisState.showAddNewCategoryModal ? 'Add New Category' : 'Add New Product'}
                show={thisState.addCategoryClicked ? thisState.showAddNewCategoryModal : thisState.showAddNewModal}
                handleClose={handleClose}
            >
                {thisState.addCategoryClicked ? (
                    <CreateProductCategoryForm />
                ) : (
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
                                    {listVendorsLoading ? (
                                        <Skeleton />
                                    ) : (
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
                                            {listVendors ||
                                                [].map((vendor) => (
                                                    <MenuItem key={vendor?.id} value={vendor?.id}>
                                                        {vendor?.name}
                                                    </MenuItem>
                                                ))}
                                        </TextField>
                                    )}
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
                )}
            </DaaDaModal>
            <DashBoardLayoutForPage
                title={value === 0 ? 'All Products Categories' : 'All Products'}
                actionButton={
                    <AddNewButton
                        title={value === 0 ? 'Add New Category' : 'Add New Product'}
                        onClick={value === 0 ? handleAddNewCategory : handleAddNewProduct}
                    />
                }
                contents={
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Product Categories" {...a11yProps(0)} />
                                <Tab label="All Products" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            {value}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <DataTable rows={rows} columns={columns} />
                        </TabPanel>
                    </Box>
                }
            />
        </BodyContainer>
    );
};

export default Products;
