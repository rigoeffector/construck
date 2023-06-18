import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {GridActionsCellItem} from '@mui/x-data-grid';
export const columns = (editAction, deleteAction) => [
    {
        field: 'name',
        headerName: 'Vendor Name',
        width: 200,
        editable: true
    },
    {
        field: 'address',
        headerName: 'Vendor Address',
        width: 150,
        editable: true
    },
    {
        field: 'contact_phone',
        headerName: 'Contact Phone',
        width: 150,
        editable: true
    },
    {
        field: 'email',
        headerName: 'Vendor Email',
        width: 250,
        editable: true
    },
    {
        field: 'added_on',
        headerName: 'Created Time',
        width: 160,
        editable: true
    },
    {
        field: '',
        headerName: 'Actions',
        type: 'actions',
        width: 150,
        getActions: (params) => [
            <div className="actions_button">
                <GridActionsCellItem
                    style={{
                        border: '1px solid'
                    }}
                    icon={<EditIcon />}
                    label="Edit"
                    color="success"
                    onClick={() => editAction(params)}
                />
            </div>,
            <div className="actions_button">
                <GridActionsCellItem
                    style={{
                        border: '1px solid'
                    }}
                    icon={<DeleteForeverIcon />}
                    label="Delete"
                    color="error"
                    onClick={() => deleteAction(params)}
                />
            </div>
        ]
    }
];
