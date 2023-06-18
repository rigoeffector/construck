import React from 'react';
import {useFormik} from 'formik';
import {validationCategorySchema} from '../schema';
import SubmitButton from '../../../reusable/submit-button';
import {Box, Grid, TextField} from '@mui/material';

const CreateProductCategoryForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: validationCategorySchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
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
                </Grid>

                <SubmitButton isLoading={false}>Save</SubmitButton>
            </form>
        </div>
    );
};

export default CreateProductCategoryForm;
