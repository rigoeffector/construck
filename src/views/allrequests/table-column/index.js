/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button} from '@mui/material';
import Chip from '@mui/material/Chip';
export const Columns =(handleViewMore)=> [
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
        flex: 3
        // width: 100
    },

    {
        field: 'requestedBy',
        headerName: 'Requested By',
        flex: 4
        // width: 100
    },
    {
        field: 'from',
        headerName: 'From',
        flex: 4
        // width: 100
    },
    {
        field: 'to',
        headerName: 'To',
        flex: 4
        // width: 100
    },
    // {
    //     field: 'purpose',
    //     headerName: 'Purpose',
    //     flex: 4
    //     // width: 200
    // },

    {
        field: 'status',
        headerName: 'Status',
        flex: 4,

        renderCell: (params) =>
            params.row.status === 'PROGRESS' ? (
                <Chip
                    label={params.row.status}
                    color="primary"
                    sx={{
                        width: '100px',
                        textAlign: 'center'
                    }}
                />
            ) : params.row.status === 'APPROVED' ? (
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
    },
    {
        field: '',
        headerName: 'More',
        renderCell: (params) => (
            <div className="actions_button">
                <Button
                    style={{
                        borderRadius: '8px',
                        border: '1px solid  #DCDFE5',
                        background: '#F9FAFB',
                        color: '#1090CB',
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: 'normal'
                    }}
                    onClick={() => handleViewMore(params)}
                >
                    View More
                </Button>
            </div>
        )
    }
];
