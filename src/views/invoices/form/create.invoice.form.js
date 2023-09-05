/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {Box, Button, CircularProgress, Grid, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import DaaDAlerts from '../../../reusable/alerts';
import {styled} from '@mui/system';
import {CREATE_INVOICE_REQUEST} from '../../../reducers/invoice/constant';
import moment from 'moment';
import {Table} from 'reactstrap';
import {validationSchema} from '../schema';
import { random } from '@mui/x-data-grid-generator';
const StyledDateTextField = styled(TextField)({
    width: '100%',
    height: '50px', // Set the width to 100%
    '& input[type="date"]': {
        padding: '10px',
        height: '30px' // You can adjust the padding as needed
    }
});
const CreateAssetInvoiceForm = ({moreInfo, randomInvoice}) => {
    const dispatch = useDispatch();

    const initialValues = {
        dueDate: '',
        description: '',
        amount: '',
        taxAmount: ''
    };
    const {
        createInvoice: {loading, success, message, error, data}
    } = useSelector((state) => state);

    const steps = ['Step 1', 'Step 2'];

    function getStepContent(step) {
        switch (step) {
            case 0:
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
                                            value={moreInfo.requestedBy}
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
                                            id="invoiceNumber"
                                            name="invoiceNumber"
                                            label="Invoice Number"
                                            value={randomInvoice}
                                            onChange={formik.handleChange}
                                            error={formik.touched.invoiceNumber && Boolean(formik.errors.invoiceNumber)}
                                            helperText={formik.touched.invoiceNumber && formik.errors.invoiceNumber}
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
                                            label="Due Date"
                                            name="dueDate"
                                            type="date"
                                            value={formik.values.dueDate}
                                            onChange={formik.handleChange}
                                            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                                            helperText={formik.touched.to && formik.errors.dueDate}
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
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            margin: '4px 0px'
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            id="amount"
                                            name="amount"
                                            label="Amount (RWF)"
                                            value={formik.values.amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                                            helperText={formik.touched.amount && formik.errors.amount}
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
                                            id="taxAmount"
                                            name="taxAmount"
                                            label="Tax Amount (RWF)"
                                            value={formik.values.taxAmount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.taxAmount && Boolean(formik.errors.taxAmount)}
                                            helperText={formik.touched.taxAmount && formik.errors.taxAmount}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            {/* <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <SubmitButton isLoading={loading} disabled={loading} type="submit">
                                    Next
                                </SubmitButton>
                            </Box> */}

                            {error && <DaaDAlerts show={error} message={error} variant={'error'} />}
                            {success && <DaaDAlerts show={success} message={'Invoice Created Successful'} variant={'success'} />}
                        </form>
                        {}
                    </div>
                );
            case 1:
                return loading ? (
                    <CircularProgress />
                ) : (
                    <Grid>
                        <img src="/assets/images/logo.png" alt="" />
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '20px'
                            }}
                        >
                            <Box
                                sx={{
                                    margin: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: '700',
                                        fontSize: '15px',
                                        margin: '5px 0px '
                                    }}
                                >
                                    Tax Invoice
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        fontSize: '15px',
                                        margin: '5px 0px '
                                    }}
                                >
                                    Bill To {data?.companyName ? data?.companyName : '--------'}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    margin: '10px'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: '700',
                                        fontSize: '15px',
                                        margin: '5px 0px '
                                    }}
                                >
                                    Invoice Number {data?.invoiceNumber}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        fontSize: '15px',
                                        margin: '5px 0px '
                                    }}
                                >
                                    Date {moment(data?.createdAt).format('YYYY-MM-DD')}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: '400',
                                        fontSize: '15px',
                                        margin: '5px 0px '
                                    }}
                                >
                                    Due Date {moment(data?.dueDate).format('YYYY-MM-DD')}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid container>
                            <Table
                                size="sm"
                                style={{
                                    width: '100%'
                                }}
                            >
                                <thead
                                    style={{
                                        background: '#dadada'
                                    }}
                                >
                                    <tr>
                                        <th>Description</th>
                                        <th>TAX</th>
                                        <th>QTY</th>
                                        <th>AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{data?.description}</td>
                                        <td>{data?.taxAmount}</td>
                                        <td>1</td>
                                        <td>{data?.amount}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Box sx={{width: '170px'}}>
                                <Grid container>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            marginBottom: '10px',
                                            marginTop: '20px'
                                        }}
                                    >
                                        <Typography>SubTotal</Typography>
                                        <Typography>{data?.amount || 0}</Typography>
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                                        <Typography>Taxes</Typography>
                                        <Typography>{data?.taxAmount || 0}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            marginBottom: '10px',
                                            borderBottom: '1px solid #dddd'
                                        }}
                                    >
                                        <Typography>Total</Typography>
                                        <Typography>{data?.taxAmount + data?.amount || 0}</Typography>
                                    </Box>

                                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                                        <Typography>Balance Due</Typography>
                                        <Typography> RWF {data?.taxAmount + data?.amount || 0}</Typography>
                                    </Box>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                );

            default:
                return 'Unknown step';
        }
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (success) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }, [success]);
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, {resetForm}) =>{
            const payload = {
                clientRequestId: moreInfo?.id,
                invoiceNumber: randomInvoice,
                dueDate: moment(values.dueDate).format('YYYY-MM-DD'),
                description: values.description,
                amount: values.amount,
                taxAmount: values.taxAmount
            };

            dispatch({type: CREATE_INVOICE_REQUEST, payload});
            resetForm();
        }
    });

    return (
        <div>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography variant="h4">All steps completed</Typography>
                    </div>
                ) : (
                    <div>
                        <Typography>{getStepContent(activeStep)}</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{border: '1px solid #ddd', height: '47px', marginRight: '20px', marginTop: '32px'}}
                            >
                                Back
                            </Button>
                            {activeStep === 0 && (
                                <Button
                                    sx={{
                                        background: '#1090CB',
                                        marginTop: '2rem',

                                        height: '45px',
                                        padding: '2px 0px',

                                        alignItems: 'center',
                                        flexShrink: '0',
                                        borderRadius: '8px'
                                    }}
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                >
                                    {loading ? (
                                        <CircularProgress
                                            style={{
                                                color: 'white'
                                            }}
                                        />
                                    ) : (
                                        'Save'
                                    )}
                                </Button>
                            )}
                        </Box>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateAssetInvoiceForm;
