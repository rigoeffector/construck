/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button} from '@mui/material';
export const columns = (handleAssignAsset) => [
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
        field: 'requestedBy',
        headerName: 'Description ',
        flex: 4
    },

    {
        field: 'to',
        headerName: 'Status',
        width: 100
    },
    {
        field: 'purpose',
        headerName: 'Assigned To',
        flex: 4
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
