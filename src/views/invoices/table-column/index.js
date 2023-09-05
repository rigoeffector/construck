/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {Chip} from '@mui/material';
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from 'react';

export const Columns = (handleDownload, handleChangeStatus, handleDelete) => {
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
        if (menuItem === 'Download Invoice' && selectedRowData) {
            // Handle "View More" action with selectedRowData
            handleDownload(selectedRowData);
        } else if (menuItem === 'Mark as Paid' && selectedRowData) {
            // Handle "Edit Asset" action with selectedRowData
            handleChangeStatus(selectedRowData);
        } else if (menuItem === 'Mark Delete' && selectedRowData) {
            // Handle "Mark Delete" action with selectedRowData
            handleDelete(selectedRowData);
        }
        setAnchorEl(null);
    };

    return [
        {
            field: 'invoiceNumber',
            headerName: 'Invoice Number',
            flex: 3
        },

        {
            field: 'createdAt',
            headerName: 'Invoice Date',
            flex: 4,
            renderCell: (params) => moment(params.row.createdAt).format('YYYY-MM-DD')

        },

        {
            field: 'dueDate',
            headerName: 'Due Date ',
            flex: 4,
            renderCell: (params) => moment(params.row.dueDate).format('YYYY-MM-DD')
        },

        {
            field: 'description',
            headerName: 'Description',
            width: 100
        },
        {
            field: 'companyName',
            headerName: 'Customer',
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
                params.row.invoiceStatus === 'ACTIVE' ? (
                    <Chip
                        label={params.row.invoiceStatus}
                        color="primary"
                        sx={{
                            width: '100px !important',
                            textAlign: 'center'
                        }}
                    />
                ) : params.row.invoiceStatus === 'PAID' ? (
                    <Chip
                        label={params.row.invoiceStatus}
                        color="success"
                        sx={{
                            width: '100px !important',
                            textAlign: 'center'
                        }}
                    />
                ) : params.row.invoiceStatus === 'UNPAID' ? (
                    <Chip
                        label={params.row.invoiceStatus}
                        color="warning"
                        sx={{
                            width: '100px !important',
                            textAlign: 'center'
                        }}
                    />
                ) : (
                    <Chip label={params.row.invoiceStatus} />
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
                        <MenuItem onClick={() => handleMenuItemClick('Download Invoice')}>View Invoice</MenuItem>

                        <MenuItem disabled={selectedRowData?.invoiceStatus === 'PAID' ?true: false} onClick={() => handleMenuItemClick('Mark as Paid')}>
                            Mark as Paid
                        </MenuItem>

                        <MenuItem
                            onClick={() => handleMenuItemClick('Mark Delete')}
                            sx={{
                                color: 'red'
                            }}
                        >
                            Delete
                        </MenuItem>
                    </Menu>
                </div>
            ]
        }
    ];
};
