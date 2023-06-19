import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import './style.css';
export const columns = [
    {field: 'id', headerName: 'ID', width: 30},
    {
        field: 'image',
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
        width: 250,
        editable: true
    },

    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 100,
        editable: true
    },

    {
        field: 'unit_price',
        headerName: 'Price',
        type: 'number',
        width: 150,
        editable: true
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
