import React from 'react';
import {Field, useFormikContext} from 'formik';
import {Form, Col} from 'react-bootstrap';
import './labelStyle.css';
import {CircularProgress} from '@mui/material';
import {  TextField } from '@material-ui/core';
import MuiAutocomplete from '@mui/material/Autocomplete';
import {styled} from '@mui/material/styles';

const Autocomplete = styled(MuiAutocomplete)({
    '.MuiAutocomplete-inputRoot': {
        color: 'var(--midas-color-dark-blue)',
        fontFamily: 'var(--font-family-monospace)',
        height: '48px',
        borderRadius: '8px',
        width: '100%',
        margin: 0,
        padding: 0
    },
    '.MuiMenuItem-root': {
        fontFamily: 'var(--font-family-monospace)'
    },
    '.MuiInputLabel-root': {
        fontSize: '0.875rem',
        fontFamily: 'var(--font-family-monospace)',
        zIndex: 0
    },
    '.MuiAutocomplete-popper': {
        fontFamily: 'var(--font-family-monospace)'
    }
});
export  const DaaDaSelectField =({options, label, name, type, keyProps, required, id, ...props}) => {
    const {setFieldValue} = useFormikContext();

    return (
        <Field name={name}>
            {({field}) => {
                return (
                    <Form.Group key={keyProps} as={Col}>
                        <Autocomplete
                            {...field}
                            {...props}
                            disablePortal
                            onChange={(event, value) => {
                                props.onChange && props.onChange(value);
                                setFieldValue(field.name, value);
                            }}
                            options={options}
                            type="select"
                            loading={props.loading}
                            onKeyUp={props.onKeyUp}
                            getOptionLabel={(option) => option?.label || option}
                            getOptionSelected={(option, val) => option === val}
                            hintStyle={{width: '600px', textAlign: 'center'}}
                            renderInput={(params) => {
                                let inputProps = {
                                    ...params.InputProps,
                                    style: {
                                        height: '48px',
                                        fontSize: '14px',
                                        color: '#404a6a',
                                        fontWeight: '600',
                                        borderRadius: '8px'
                                    }
                                };

                                if (type === 'async-select') {
                                    inputProps = {
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {props.loading && <CircularProgress color="inherit" size={20} />}
                                                {params.InputProps.endAdornment}
                                            </>
                                        )
                                    };
                                }
                                return (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        isValid={props.touched[name] && !props.errors[name]}
                                        isInvalid={props.touched[name] && props.errors[name]}
                                        helperText={props.errors[name] ? props.errors[name] : ''}
                                        error={props.errors[name] ? props.errors[name] : false}
                                        label={
                                            required ? (
                                                <div>
                                                    {label}
                                                    <span style={{color: 'red'}}>*</span>
                                                </div>
                                            ) : (
                                                label
                                            )
                                        }
                                        InputProps={inputProps}
                                        InputLabelProps={{
                                            style: {
                                                fontSize: '14px',
                                                padding: '0px 0px 0px 0px'
                                            }
                                        }}
                                    />
                                );
                            }}
                        />
                        <Form.Control.Feedback type="invalid">{props.errors[name]}</Form.Control.Feedback>
                    </Form.Group>
                );
            }}
        </Field>
    );
}
export default DaaDaSelectField
