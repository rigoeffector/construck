/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, Chip} from '@mui/material';
export const columns = (handleAssignAsset) => [
    {
        field: 'name',
        headerName: 'Driver Name',
        flex: 3,
        renderCell: (params) => `${params.row.firstName} ${params.row.lastName}`
    },

    // {
    //     field: 'idNumber',
    //     headerName: 'Driver Number',
    //     flex: 4
    // },

    {
        field: 'phoneNumber',
        headerName: 'Phone',
        flex: 4
    },

    {
        field: 'driverStatus',
        headerName: 'Status',
        flex: 4,

        renderCell: (params) =>
            params.row.driverStatus === 'AVAILABLE' ? (
                <Chip
                    label={params.row.driverStatus}
                    color="success"
                    sx={{
                        width: '100px !important',
                        textAlign: 'center'
                    }}
                />
            ) : (
                <Chip label={params.row.driverStatus} color="warning" />
            )
    },
    // {
    //     field: '',
    //     headerName: 'Actions',
    //     type: 'actions',
    //     flex: 4,
    //     getActions: (params) => [
    //         <div className="actions_button">
    //             <Button color="red" variant="outlined">
    //                 Delete
    //             </Button>
    //         </div>
    //     ]
    // }
];
