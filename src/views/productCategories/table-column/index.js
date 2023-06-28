import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
export const columns = (handleEdit, handleDelete) => [
    {
        field: 'image',
        width: 80,
        headerName: 'Image',
        renderCell: (params) => {
            return (
                <div>
                    <img src={params.row.icon} alt="" id="product_img" />
                </div>
            );
        }
    },
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
        width: 320,
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
                        border: '1px solid #058441'
                    }}
                    icon={<EditIcon sx={{
                        color:'#058441'
                    }} />}
                    label="Edit"
                    color="success"
                    onClick={() => handleEdit(params)}
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
                    onClick={() => handleDelete(params)}
                />
            </div>
        ]
    }
];
