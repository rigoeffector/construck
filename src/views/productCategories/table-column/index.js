import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
export const columns = [
 
   
    {
        field: 'name',
        headerName: 'Category name',
        width: 200,
        editable: true
    },
    {
        field: 'added_by',
        headerName: 'Added By',
        width: 150,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Category Description',
        width: 350,
        editable: true
    },
    {
        field: 'added_on',
        headerName: 'Created At',
        width: 150,
        editable: true
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
            </div>
        ]
    }
];
