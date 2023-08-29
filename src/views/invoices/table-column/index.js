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
        field: 'number',
        headerName: 'Invoice Number',
        flex: 3
    },

    {
        field: 'invoiceDate',
        headerName: 'Invoice Date',
        flex: 4
    },

    {
        field: 'dueDate',
        headerName: 'Due Date ',
        flex: 4
    },

    {
        field: 'description',
        headerName: 'Description',
        width: 100
    },
    {
        field: 'company',
        headerName: 'Company',
        flex: 4
    },
    {
        field: 'amount',
        headerName: 'Invoice Amount',
        flex: 4
    },

    {
        field: 'status',
        headerName: 'Status',
        flex: 4,

        renderCell: (params) =>
            params.row.status === 'Active' ? (
                <Chip
                    label={params.row.status}
                    color="primary"
                    sx={{
                        width: '100px !important',
                        textAlign: 'center'
                    }}
                />
            ) : params.row.status === 'Paid' ? (
                <Chip
                    label={params.row.status}
                    color="success"
                    sx={{
                        width: '100px !important',
                        textAlign: 'center'
                    }}
                />
            ) : params.row.status === 'Unpaid' ? (
                <Chip
                    label={params.row.status}
                    color="warning"
                    sx={{
                        width: '100px !important',
                        textAlign: 'center'
                    }}
                />
            ) : (
                <Chip label={params.row.status} />
            )
    },
    {
        field: '',
        headerName: 'Action',
        type: 'actions',
        getActions: (params) => [
            <div className="actions_button">
                <MoreVertIcon onClick={() => handleAssignAsset(params)}></MoreVertIcon>
            </div>
        ]
    }
];
