import React from 'react';
import {useFormik} from 'formik';
import {validationCategorySchema} from '../schema';
import SubmitButton from '../../../reusable/submit-button';
import {Box, Grid, TextField} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {keys} from '../../vendors';
import {CREATE_PRODUCT_CATEGORY_REQUEST} from '../../../reducers/product/categories/constant';
import DaaDAlerts from '../../../reusable/alerts';

const CreateProductCategoryForm = () => {
    const dispatch = useDispatch();
    const {
        auth,
        createProductCategory: {loading, success, message}
    } = useSelector((state) => state);
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: validationCategorySchema,
        onSubmit: (values) => {
            const payload = {
                entity_name: 'product category',
                username: auth?.data?.username,
                login_token: auth?.data?.login_token,
                api_key: keys,
                details: {...values}
            };

            dispatch({type: CREATE_PRODUCT_CATEGORY_REQUEST, payload});
        }
    });
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

                <SubmitButton isLoading={loading}>Save</SubmitButton>
                {message && !success && <DaaDAlerts show={!success} message={message} variant={'error'} />}
            </form>
        </div>
    );
};

export default CreateProductCategoryForm;
