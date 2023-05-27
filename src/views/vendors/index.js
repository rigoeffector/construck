import * as React from 'react';
import BodyContainer from '../../reusable/container';

import DataTable from '../../reusable/table';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';

const columns = [
    {field: 'id', headerName: 'ID', width: 20},
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
        field: 'contact',
        headerName: 'Contact',
        width: 100,
        editable: true
    },
   
    {
        field: 'email',
        headerName: 'Email',
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
    {
        id: 1,
        lastName: 'Snow',
        firstName: 'Jon',
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',        address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    },
    {
        id: 2,
        lastName: 'Lannister',
        firstName: 'Cersei',
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',        address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    },
    {
        id: 3,
        lastName: 'Lannister',
        firstName: 'Jaime',
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',
        address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    },
    {
        id: 4,
        lastName: 'Stark',
        firstName: 'Arya',
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',      address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    },
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', payment: 'Bank Account', email: 'rigo@gmail.com'},
    {
        id: 6,
        lastName: 'Melisandre',
        firstName: null,
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',      address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    },
    {
        id: 7,
        lastName: 'Clifford',
        firstName: 'Ferrara',
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',        address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    },
    {
        id: 8,
        lastName: 'Frances',
        firstName: 'Rossini',
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',        address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    },
    {
        id: 9,
        lastName: 'Roxie',
        firstName: 'Harvey',
        payment: 'Bank Account',
        email: 'rigo@gmail.com',
        contact: '0785674809',        address: 'Kigali KK 140 ST',
        price: '4500 RWF'
    }
];

export default function Vendors() {
    return (
        <BodyContainer>
            <DashBoardLayoutForPage title={'All Vendors Information'} contents={<DataTable rows={rows} columns={columns} />} />
        </BodyContainer>
    );
}
