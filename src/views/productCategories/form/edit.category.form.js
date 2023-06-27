/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {thumbsContainer, validationCategorySchema} from '../schema';
import SubmitButton from '../../../reusable/submit-button';
import {Box, Button, Grid, IconButton, TextField} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {keys} from '../../vendors';
import {UPDATE_PRODUCT_CATEGORY_REQUEST} from '../../../reducers/product/categories/constant';
import DaaDAlerts from '../../../reusable/alerts';
import {img, thumb, thumbInner} from '../../products/schema';
import {useDropzone} from 'react-dropzone';
import {storage} from '../../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {v4} from 'uuid';

const EditProductCategoryForm = (props) => {
    const {categoryData} = props;
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const dispatch = useDispatch();
    const {
        auth,
        updateProductCategory: {loading, success, message}
    } = useSelector((state) => state);
    const formik = useFormik({
        initialValues: {
            name: categoryData.name,
            description: categoryData.description
        },
        validationSchema: validationCategorySchema,
        onSubmit: (values) => {
            const payload = {
                entity_name: 'product_category',
                username: auth?.data?.username,
                login_token: auth?.data?.login_token,
                instance_id: categoryData?.uuid,
                api_key: keys,
                details: {...values, ...imageUrls}
            };

            dispatch({type: UPDATE_PRODUCT_CATEGORY_REQUEST, payload});
            setImageUrls({});
        }
    });
    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);
    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
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
    const handleUploadProductImages = async () => {
        setLoadingUpload(true);
        const urls = {};
        await Promise.all(
            files.map((image, i) => {
                const imageRef = ref(storage, `categories/${image.path + v4()}`);
                uploadBytes(imageRef, image, 'data_url').then(async (data) => {
                    if (data) {
                        const downLoadURL = await getDownloadURL(imageRef);

                        urls[`icon`] = downLoadURL;

                        setTimeout(() => {
                            setLoadingUpload(false);
                            setImageUrls(urls);
                        }, 2000);
                        console.log(urls);
                    }
                });
            })
        );
    };
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
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
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
                                <em>(1 files are the maximum number of files you can drop here)</em>
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
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <SubmitButton isLoading={loading} disabled={Object.keys(imageUrls).length < 1 }>Update</SubmitButton>
                    {Object.keys(imageUrls).length > 0 ? (
                        ''
                    ) : (
                        <Button
                            sx={{
                                marginTop: '2rem'
                            }}
                            variant="outlined"
                            disabled={files.length < 1}
                            onClick={handleUploadProductImages}
                        >
                            {loadingUpload ? 'Uploading.....' : 'Upload All Images'}
                        </Button>
                    )}
                </Box>
                {message && !success && <DaaDAlerts show={!success} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default EditProductCategoryForm;
