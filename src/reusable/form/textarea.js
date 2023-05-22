import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { Field } from 'formik';
import './labelStyle.css';
import { Box, TextField } from '@material-ui/core';

export const DaaDaTextAreaField = ({ name, type, placeholder, transparent, required, label, ...props }) => {
    return (
        <>
            <Field name={name}>
                {({ field }) => {
                    return (
                        <Form.Group as={Col}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 0, width: '100%', height: '100%', borderRadius: '8px' }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    className={required ? 'required' : 'not-required'}
                                    error={props.errors[name] ? props.errors[name] : false}
                                    id="outlined-basic"
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '14px',
                                            margin: '2px 0px',
                                            lineHeight: '24px',
                                            padding: '0px 0px 0px 0px'
                                        }
                                    }}
                                    InputProps={{
                                        inputProps: { min: 0 },
                                        style: {
                                            fontSize: '14px',
                                            color: '#404a6a',
                                            fontWeight: '600',
                                            borderRadius: '8px'
                                        }
                                    }}
                                    label={
                                        required ? (
                                            <div>
                                                {label}
                                                <span style={{ color: 'red' }}>*</span>
                                            </div>
                                        ) : (
                                            label
                                        )
                                    }
                                    variant="outlined"
                                    {...field}
                                    type={type || 'textarea'}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={20}
                                    placeholder={placeholder}
                                    transparent={transparent}
                                    isValid={props.touched[name] && !props.errors[name]}
                                    isInvalid={props.touched[name] && props.errors[name]}
                                    helperText={props.errors[name] ? props.errors[name] : ''}
                                />
                            </Box>

                            <Form.Control.Feedback type="invalid">{props.errors[name]}</Form.Control.Feedback>
                        </Form.Group>
                    );
                }}
            </Field>
        </>
    );
};

export default DaaDaTextAreaField;
