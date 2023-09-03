import React from 'react';
import Button from '@mui/material/Button';
const CancelButton = ({action, title}) => {
    return (
    
            <Button
                variant="contained"
                onClick={action}
                style={{
                    display: 'flex',
                    marginRight: '20px',
                    height: '40px',
                    padding: '8px 16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '8px',
                    background: '#EDEFF2',
                    color: '#64748A'
                }}
            >
                {title}
            </Button>
        
    );
};

export default CancelButton;
