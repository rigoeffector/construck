import React from 'react';
import Button from '@mui/material/Button';
import {CircularProgress} from '@mui/material';
const SubmitButton = ({children, isLoading}) => {
    return (
        <div>
            <Button
                disabled={isLoading}
                variant="contained"
                type="submit"
                style={{
                    background: '#795548',
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
