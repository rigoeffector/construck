/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import '../style.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {Chip} from '@mui/material';

export const Columns = (handleViewMore, handleEdit, handleArchive, handleDelete, handleAvailable) => {

    const [selectedRowData, setSelectedRowData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, params) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedRowData(params.row); // Set the selected row data
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (menuItem) => {
        debugger;
        if (menuItem === 'View More' && selectedRowData) {
            // Handle "View More" action with selectedRowData
            handleViewMore(selectedRowData);
        } else if (menuItem === 'Mark Available' && selectedRowData) {
            // Handle "Edit Asset" action with selectedRowData
            handleAvailable(selectedRowData);
        } else if (menuItem === 'Delete' && selectedRowData) {
            // Handle "Delete" action with selectedRowData
            handleDelete(selectedRowData);
        } else if (menuItem === 'Archive' && selectedRowData) {
            // Handle "Archive" action with selectedRowData
            handleArchive(selectedRowData);
        }
        setAnchorEl(null);
    };

    return [
        {
            field: 'assetName',
            headerName: 'Asset Name',
            flex: 3
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 4
        },
        {
            field: 'driver',
            headerName: 'Driver Name',
            flex: 4,
            renderCell:(params) => params.row.driver?.firstName ? `${params.row.driver?.firstName} ${params.row.driver?.lastName }` : '-------'
             
        },
        {
            field: 'assetStatus',
            headerName: 'Status',
            width: 100,
            renderCell: (params) =>
                params.row.assetStatus === 'AVAILABLE' ? (
                    <Chip
                        label={params.row.assetStatus}
                        color="success"
                        sx={{
                            width: '100px !important',
                            textAlign: 'center'
                        }}
                    />
                ) : params.row.assetStatus === 'ASSIGNED' ? (
                    <Chip
                        label={params.row.assetStatus}
                        color="warning"
                        sx={{
                            width: '100px !important',
                            textAlign: 'center'
                        }}
                    />
                ) : (
                    <Chip label={params.row.assetStatus} color="error" />
                )
        },
        {
            field: '',
            headerName: 'Action',
            type: 'actions',
            getActions: (params) => [
                <div className="actions_button">
                    <MoreVertIcon
                        id={`menu-${params.row.id}`} // Use a unique ID for each menu
                        aria-controls={`menu-${params.row.id}`}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => handleClick(event, params)}
                    ></MoreVertIcon>
                    <Menu
                        id={`menu-${params.row.id}`} // Use the same ID as above
                        MenuListProps={{
                            'aria-labelledby': `menu-${params.row.id}`
                        }}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={() => handleMenuItemClick('View More')}>View More</MenuItem>
                        <MenuItem
                            onClick={() => handleMenuItemClick('Mark Available')}
                            disabled={selectedRowData?.assetStatus === 'AVAILABLE' ? true : false}
                        >
                            Mark Available
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleMenuItemClick('Delete')}
                            sx={{
                                color: 'red'
                            }}
                        >
                            Delete
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Archive')} disabled={selectedRowData?.assetStatus === 'ARCHIVED' ? true : false}>
                            Archive
                        </MenuItem>
                    </Menu>
                </div>
            ]
        }
    ];
};

export default Columns;
