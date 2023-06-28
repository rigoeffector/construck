import React from 'react';
import Button from '@mui/material/Button';
import {CircularProgress} from '@mui/material';
const SubmitButton = ({children, isLoading, disabled}) => {
    return (
        <div>
            <Button
                disabled={disabled}
                variant="contained"
                type="submit"
                style={{
                    background: '#058441',
                    marginTop: '2rem'
                }}
            >
                {isLoading ? (
                    <CircularProgress
                        size={25}
                        style={{
                            color: 'white'
                        }}
                    />
                ) : (
                    children
                )}
            </Button>
        </div>
    );
};

export default SubmitButton;
