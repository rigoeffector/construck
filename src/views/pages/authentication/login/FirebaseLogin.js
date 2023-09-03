/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    Typography
} from '@material-ui/core';

import useScriptRef from '../../../../hooks/useScriptRef';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import history from '../../../../history';
import Google from './../../../../assets/images/icons/social-google.svg';
import {LOGIN_USER_REQUEST, LOGIN_USER_RESET} from '../../../../reducers/auth/constant';
import DaaDAlerts from '../../../../reusable/alerts';
import SubmitButton from '../../../../reusable/submit-button';

const useStyles = makeStyles((theme) => ({
    root: {},
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[600],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    margin: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    forgot: {
        textDecoration: 'none',
        color: theme.palette.purple.main
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    title: {
        color: theme.palette.grey[600]
    },
    login: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    loginput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > label': {
            top: '23px',
            left: 0,
            color: theme.palette.grey[500],
            '&[data-shrink="false"]': {
                top: '5px'
            }
        },
        '& > div > input': {
            padding: '30.5px 14px 11.5px !important'
        },
        '& legend': {
            display: 'none'
        },
        '& fieldset': {
            top: 0
        }
    },
    startAdornment: {
        color: theme.palette.grey[500],
        marginTop: '18px',
        width: 'auto'
    }
}));

const FirebaseLogin = (props, {className, ...rest}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        auth: {data, loading, message: error_message, success, error}
    } = useSelector((state) => state);
    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const googleHandler = async () => {};

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        dispatch({type: LOGIN_USER_RESET});
    };
    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    username: 'ivan@gmail.com',
                    password: 'password'
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().email('Must be a valid username').max(255).required('Username is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values) => {
                    const payload = {
                        ...values
                    };
                    dispatch({type: LOGIN_USER_REQUEST, payload});
                    // window.location.reload();
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                    <form noValidate onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            className={classes.loginput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-email-login"> Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="text"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Username"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {errors.username}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            className={classes.loginput}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box mt={3}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box mt={2}>
                            <SubmitButton disabled={isSubmitting || loading} isLoading={loading}>
                                {'Sign In'}
                            </SubmitButton>
                        </Box>
                    </form>
                )}
            </Formik>
            {!success && !loading && error_message && (
                <DaaDAlerts show={!success && !loading} message={error_message} handleClose={handleClose} variant={'error'} />
            )}
        </React.Fragment>
    );
};

export default FirebaseLogin;
