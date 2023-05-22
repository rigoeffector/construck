import * as React from 'react';
import BodyContainer from '../../reusable/container';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import DataTable from '../../reusable/table';

const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
        editable: true
    },
    {
        field: 'Product',
        headerName: 'Product Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 160,
        editable: true
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 160,
        editable: true
    },
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'Delivered', address: 'Kigali KK 140 ST', price: '4500 RWF'},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: 'Delivered', address: 'Kigali KK 140 ST', price: '4500 RWF'},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: 'On Deliver', address: 'Kigali KK 140 ST', price: '4500 RWF'},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status: 'In Line', address: 'Kigali KK 140 ST', price: '4500 RWF'},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 56},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 19, status: 'Pending', address: 'Kigali KK 140 ST', price: '4500 RWF'},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, status: 'Delivered', address: 'Kigali KK 140 ST', price: '4500 RWF'},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, status: 'Cancelled', address: 'Kigali KK 140 ST', price: '4500 RWF'},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, status: 'Delivered', address: 'Kigali KK 140 ST', price: '4500 RWF'}
];

export default function DeliveryTracking() {
    return (
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Delivery History'}
                contents={<DataTable rows={rows} columns={columns} />}

            />
        </BodyContainer>
    );
}
