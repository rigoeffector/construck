import * as React from 'react';
import Box from '@mui/material/Box';
import {useDemoData} from '@mui/x-data-grid-generator';
import {DataGrid} from '@mui/x-data-grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BodyContainer from '../../reusable/container';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';

export function CustomFooterStatusComponent(props) {
    return (
        <Box sx={{p: 1, display: 'flex'}}>
            <FiberManualRecordIcon
                fontSize="small"
                sx={{
                    mr: 1,
                    color: props.status === 'connected' ? '#4caf50' : '#d9182e'
                }}
            />
            Status {props.status}
        </Box>
    );
}

export default function DaaDaUsersPage() {
    const {data} = useDemoData({
        dataSet: 'Employee',
        rowLength: 40,
        maxColumns: 10
    });
    return (
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Customers History'}
                contents={
                    <Box sx={{width: '100%'}}>
                        <Box sx={{height: 350, width: '100%', mb: 1}}>
                            <DataGrid
                                {...data}
                                slots={{
                                    footer: CustomFooterStatusComponent
                                }}
                                
                            />
                        </Box>
                        
                    </Box>
                }
            />
        </BodyContainer>
    );
}
