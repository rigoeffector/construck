import {Box} from '@mui/material';
import React from 'react';
import {Image} from 'react-bootstrap';

const DaaDaEmptyDada = ({message}) => {
    return (
        <Box
            sx={{
                margin: '20px'
            }}
        >
            <Image
                style={{
                    height: '150px'
                }}
                src="/assets/images/users/folder.png"
            />
            <p
                style={{
                    fontWeight: '700',
                    color: 'black'
                }}
            >
                {message}
            </p>
        </Box>
    );
};

export default DaaDaEmptyDada;
