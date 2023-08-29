import React from 'react';
import PageContainer from '../../reusable/breadcrumbs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import DataTable from '../../reusable/table';
import {columns} from './table-column';
import {Button, Grid} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Drivers = () => {
    const data = [
        {
            id: '1',
            name: 'Wesley Gross',
            idNumber: '112443434309',
            phone: '07889898999',
            status: 'Unavailable'
        },
        {
            id: '2',
            name: 'Wesley MUTONI ',
            idNumber: '112443434ADSD309',
            phone: '07889598999',
            status: 'Available'
        },
        {
            id: '3',
            name: 'CYUSA Ange ',
            idNumber: '11244343234ADSD309',
            phone: '07889500999',
            status: 'Available'
        },
        {
            id: '4',
            name: 'NKUSO Deny ',
            idNumber: '112443OOP34ADSD309',
            phone: '078895019',
            status: 'Available'
        },
        {
            id: '5',
            name: 'NMMBOKO Martine ',
            idNumber: '11244343234ADSD309',
            phone: '07889503999',
            status: 'Available'
        },

        {
            id: '6',
            name: 'John De  Ange ',
            idNumber: '11244Q43234ADSD309',
            phone: '07839500999',
            status: 'Unavailable'
        }
    ];
    return (
        <PageContainer pageHeading="List of Drivers">
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{
                    margin: '20px 0'
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: '8px',
                        background: '#1090CB'
                    }}
                >
                    Add driver
                </Button>
            </Grid>
            <Paper
                sx={{
                    // Adjust the width as needed
                    padding: '10px'
                }}
            >
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="driver-content" id="driver-header">
                        <Typography variant="h6">Driver</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <DataTable showQuickSearchToolbar={false} checkboxSelection={false} rows={data} columns={columns()} />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </PageContainer>
    );
};

export default Drivers;
