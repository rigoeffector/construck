import React from 'react';
import Button from '@mui/material/Button';
const AddNewButton = ({title, onClick, disabled}) => {
    return (
        <Button
            variant="outlined"
            onClick={onClick}
            disabled={disabled}
            style={{
                borderColor: '#955436',
                color: '#955436'
            }}
        >
            {title}
        </Button>
    );
};

export default AddNewButton;
