import React from 'react';
import BodyContainer from '../../reusable/container';
import DashBoardLayoutForPage from '../../reusable/dashboard-layouts';
import DataTable from '../../reusable/table';
import { columns } from '../products/table-column';
import { rows } from '../products/table-column/row';

const Transactions = () => {
    return (
        <BodyContainer>
            <DashBoardLayoutForPage
                title={'All Transactions'}
                contents={<DataTable rows={rows} columns={columns} />}

            />
        </BodyContainer>
    );
}

export default Transactions;
