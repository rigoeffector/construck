import React from 'react';
import Button from '@mui/material/Button';
const CancelButton = ({handleClose}) => {
    return (
        <div>
            <Button
                id="cancel_btn"
                type=""
                variant="none"
                style={{
                    height: '40px',
                    background: ' #FDFDFF',
                    border: '2px solid #D4D7E6',
                    'box-shadow': ' 0px 2px 5px rgba(38, 51, 77, 0.03)',
                    'border-radius': '5px',
                    color: '#6B7A99',
                    fontWeight: '900',
                    display: 'block',
                    fontSize: '12px'
                }}
                onClick={handleClose}
            >
                Cancel
            </Button>
        </div>
    );
};

export default CancelButton;
