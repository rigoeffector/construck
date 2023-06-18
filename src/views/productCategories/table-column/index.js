import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
export const columns = [
    {field: 'id', headerName: 'ID', width: 30},
   
    {
        field: 'name',
        headerName: 'Category name',
        width: 250,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Category Description',
        width: 350,
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
