/* eslint-disable no-unused-vars */
import React from 'react';
import BodyContainer from '../../reusable/container';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
// import { rows } from '../products/table-column/row';

const OrdersCheckout = () => {
    return (
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Orders Checkout'}
                // contents={<DataTable rows={rows} columns={columns} />}

            />
        </BodyContainer>
    );
}

export default OrdersCheckout;
