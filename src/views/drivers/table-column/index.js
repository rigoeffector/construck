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
        flex: 3
    },

    {
        field: 'idNumber',
        headerName: 'Driver Number',
        flex: 4
    },

    

    {
        field: 'phone',
        headerName: 'Phone',
        flex: 4
    },

    {
        field: 'status',
        headerName: 'Status',
        flex: 4,

        renderCell: (params) =>
            params.row.status === 'Available' ? (
                <Chip
                    label={params.row.status}
                    color="success"
                    sx={{
                        width: '100px !important',
                        textAlign: 'center'
                    }}
                />
            ) : (
                <Chip label={params.row.status} color="warning" />
            )
    }
];
