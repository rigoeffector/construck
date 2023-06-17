import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function DaaDAlerts({ message, show, handleClose, variant, action }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={show}>
        <Alert
          severity={variant}
          action={
            <IconButton aria-label='close' color='inherit' size='small' onClick={handleClose}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <Box>
            {message}
            {action && action}
          </Box>
        </Alert>
      </Collapse>
    </Box>
  );
}
