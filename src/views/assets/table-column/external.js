/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import '../style.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, Chip} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
export const Columns = (handleViewMore,
    handleEdit,
    handleArchive,handleDelete) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            field: 'description',
            headerName: 'Description ',
            flex: 4
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 100,
        },

        
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) =>
            params.row.status === 'Available' ? (
                <Chip
                    label={params.row.status}
                    color="primary"
                    sx={{
                        width: '100px !important',
                        textAlign: 'center'
                    }}
                />
            ) : params.row.status === 'Unavailable' ? (
                <Chip
                    label={params.row.status}
                    color="success"
                    sx={{
                        width: '100px !important',
                        textAlign: 'center'
                    }}
                />
            ) : params.row.status === 'Maintenance' ? (
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
            field: 'assignedTo',
            headerName: 'Assigned To ',
            width: 100
        },

        {
            field: '',
            headerName: 'Action',
            type: 'actions',
            getActions: (params) => [
                <div className="actions_button">
                    <MoreVertIcon
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    ></MoreVertIcon>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button'
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={()=>handleViewMore(params)}>View More</MenuItem>
                        <MenuItem onClick={()=>handleEdit(params)}>Edit Asset</MenuItem>
                        <MenuItem onClick={()=>handleDelete(params)} sx={{
                            color: 'red'
                        }}>Mark Delete</MenuItem>
                        <MenuItem onClick={()=>handleArchive(params)}>Archive</MenuItem>
                    </Menu>
                </div>
            ]
        }
    ];
};
