import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
export const columns = (handleDelete, handleEdit) => [
    {
        field: 'image',
        width: 80,
        headerName: 'Image',
        renderCell: (params) => {
            return (
                <div>
                    <img src={'/assets/images/users/meat.png'} alt="" id="product_img" />
                </div>
            );
        }
    },
    {
        field: 'name',
        headerName: 'Product name',
        width: 200,
       
    },

    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 100,
       
    },

    {
        field: 'unit_price',
        headerName: 'Price',
        width: 100,
       
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 300,
       
    },

    {
        field: '',
        headerName: 'Actions',
        type: 'actions',
        width: 300,
        getActions: (params) => [
            <div className="actions_button">
                <GridActionsCellItem
                    style={{
                        border: '1px solid'
                    }}
                    icon={<EditIcon />}
                    label="Edit"
                    color="success"
                    onClick={(params) => handleEdit(params)}
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
                    onClick={(params) => handleDelete(params)}
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
