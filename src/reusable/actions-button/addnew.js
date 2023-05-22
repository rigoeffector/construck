import React from 'react';
import Button from '@mui/material/Button';
const AddNewButton = ({title, onClick}) => {
    return (
        <Button
            variant="outlined"
            onClick={onClick}
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
