/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button} from '@mui/material';
import Chip from '@mui/material/Chip';
export const columns = [
    {
        field: 'assetName',
        headerName: 'Asset Name',
        flex: 4
        // width: 200
    },
    // {
    //     field: 'customerName',
    //     headerName: 'Customer Name',
    //     flex: 3
    // },

    {
        field: 'category',
        headerName: 'Category',
        flex: 3,
        // width: 100
    },

    {
        field: 'requestedBy',
        headerName: 'Requested By',
        flex: 4,
        // width: 100
    },
    {
        field: 'from',
        headerName: 'From',
        flex: 4,
        // width: 100
    },
    {
        field: 'to',
        headerName: 'To',
        flex: 4,
        // width: 100
    },
    {
        field: 'purpose',
        headerName: 'Purpose',
        flex: 4,
        // width: 200
    },

    {
        field: 'status',
        headerName: 'Status',
        flex: 4,

        renderCell: (params) =>
            params.row.assetStatus === 'COMPLETED' ? (
                <Chip
                    label={params.row.assetStatus}
                    color="primary"
                    sx={{
                        width: '100px',
                        textAlign: 'center'
                    }}
                />
            ) : params.row.assetStatus === 'ASSIGNED' ? (
                <Chip
                     label={params.row.assetStatus}
                    color="success"
                    sx={{
                        width: '100px',
                        textAlign: 'center'
                    }}
                />
            ) : (
                <Chip
                     label={params.row.assetStatus}
                    color="warning"
                    sx={{
                        width: '100px',
                        textAlign: 'center'
                    }}
                />
            )
    }
];
