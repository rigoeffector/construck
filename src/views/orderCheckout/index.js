import React from 'react';
import BodyContainer from '../../reusable/container';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import DataTable from '../../reusable/table';
import { rows } from '../products/table-column/row';
import { columns } from '../products/table-column';

const OrdersCheckout = () => {
    return (
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Orders Checkout'}
                contents={<DataTable rows={rows} columns={columns} />}

            />
        </BodyContainer>
    );
}

export default OrdersCheckout;
