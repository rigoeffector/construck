/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button} from '@mui/material';
import Chip from '@mui/material/Chip';
export const columns = () => {
    return [
        {
            field: 'name',
            headerName: 'Asset Name',
            flex: 3
        },

        {
            field: 'category',
            headerName: 'Category',
            flex: 4
        },

        {
            field: 'from',
            headerName: 'From ',
            flex: 4
        },

        {
            field: 'to',
            headerName: 'To',
            width: 100
        },
        {
            field: 'purpose',
            headerName: 'Assigned To',
            flex: 4
        },

        {
            field: 'status',
            headerName: 'Status',
            flex: 4,

            renderCell: (params) =>
                params.row.status === 'Completed' ? (
                    <Chip
                        label={params.row.status}
                        color="primary"
                        sx={{
                            width: '100px',
                            textAlign: 'center'
                        }}
                    />
                ) : params.row.status === 'Assigned' ? (
                    <Chip
                         label={params.row.status}
                        color="success"
                        sx={{
                            width: '100px',
                            textAlign: 'center'
                        }}
                    />
                ) : (
                    <Chip
                         label={params.row.status}
                        color="warning"
                        sx={{
                            width: '100px',
                            textAlign: 'center'
                        }}
                    />
                )
        }
    ];
};
