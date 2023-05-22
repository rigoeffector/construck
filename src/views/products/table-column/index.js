import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
export const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'firstName',
        headerName: 'Product name',
        width: 150,
        editable: true
    },
    {
        field: 'lastName',
        headerName: 'Vendor Name',
        width: 150,
        editable: true
    },
    {
        field: 'age',
        headerName: 'Available Quantity',
        width: 150,
        editable: true
    },
    {
        field: 'age',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true
    },
    {
        field: 'fullName',
        headerName: 'Description',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
    {
        field: '',
        headerName: 'Actions',
        type: 'actions',
        width: 260,
        getActions: (params) => [
            <div className="actions_button">
                <GridActionsCellItem
                    style={{
                        border: '1px solid'
                    }}
                    icon={<EditIcon />}
                    label="Edit"
                    color="success"
                    // onClick={}
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
                    // onClick={}
                />
            </div>,
            <div className="actions_button">
                <GridActionsCellItem
                    style={{
                        border: '1px solid'
                    }}
                    icon={<MoreIcon />}
                    label="More"
                    color="info"
                    // onClick={}
                />
            </div>
        ]
    }
];
