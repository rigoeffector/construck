import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { Box, TextField } from '@material-ui/core';
import './labelStyle.css';

import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@mui/material';
import { Field, useFormikContext } from 'formik';
const useStyles = makeStyles((theme) => ({
    textField: {
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
            borderColor: 'var(--midas-new-orange) !important'
        },
        '&. MuiOutlinedInput-adornedEnd': {
            paddingRight: '0px'
        }
    }
}));
export const DaaDaInputField = ({
    name,
    placeholder,
    type,
    transparent,
    readonly,
    label,
    required,
    keyProps,
    defaultValue,
    currency,
    symbol = false,
    onChange,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const classes = useStyles();
    return (
        <>
            <Field name={name} style={{ height: '50px' }}>
                {({ field }) => {
                    return (
                        <Form.Group key={keyProps} as={Col}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 0, width: '100%', height: '100%' }
                                }}
                                noValidate
                                autoComplete="on"
                            >
                                <TextField
                                    className={classes.textField}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '14px',
                                            padding: '0px 0px 0px 0px'
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: symbol && (
                                            <InputAdornment position="end">
                                                <p
                                                    style={{
                                                        fontSize: '12px',
                                                        color: 'var(--midas-color-dark-blue)',
                                                        fontWeight: '400'
                                                    }}
                                                >
                                                    {currency}
                                                </p>
                                            </InputAdornment>
                                        ),
                                        inputProps: { min: 0 },
                                        style: {
                                            height: '48px',
                                            fontSize: '14px',
                                            color: '#404a6a',
                                            fontWeight: '600',
                                            borderRadius: '8px'
                                        }
                                    }}
                                    error={props.errors[name] ? props.errors[name] : false}
                                    id="outlined-basic txtfield"
                                    label={
                                        required ? (
                                            <div>
                                                {label} <span style={{ color: 'red' }}>*</span>
                                            </div>
                                        ) : (
                                            label
                                        )
                                    }
                                    variant="outlined"
                                    {...field}
                                    type={type || 'text'}
                                    placeholder={placeholder}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        onChange && onChange(value);
                                        setFieldValue(field.name, value);
                                    }}
                                    value={field.value || ''}
                                    disabled={readonly}
                                    transparent={transparent}
                                    isValid={props.touched[name] && !props.errors[name]}
                                    isInvalid={props.touched[name] && props.errors[name]}
                                    helperText={props.errors[name] ? props.errors[name] : ''}
                                    onKeyPress={(e) => {
                                        e.key === 'Enter' && e.preventDefault();
                                    }}
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
export default DaaDaInputField;
