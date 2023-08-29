/* eslint-disable no-unused-vars */
import React from 'react';
import {Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import TotalIncomePatternCard from '../../ui-component/cards/TotalIncomePatternCard';
import TotalIncomeCard from '../../ui-component/cards/TotalIncomeCard';
import ChartCard from '../../ui-component/cards/ChartCard';
import PopularCard from '../../ui-component/cards/PopularCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreIcon from '@mui/icons-material/More';
import {GridActionsCellItem} from '@mui/x-data-grid';
import ConstructDataTable from '../../reusable/datatable/index';
import PageContainer from '../../reusable/breadcrumbs';
import {Button} from '@mui/material';
import AssetsSummaryCardsView from './summary';
import LinearChart from './lineChart';
import DoughnutChart from './donout';
import LineBarComboChart from './lineChart';
const Dashboard = () => {
    const columns = [
        {
            selector: 'name',
            name: 'Asset Name'
            // width: 200
        },

        {
            selector: 'category',
            name: 'Category'
            // width: 100
        },

        {
            selector: 'requestedBy',
            name: 'Requested By'
            // width: 100
        },
        {
            selector: 'from',
            name: 'From'
            // width: 100
        },
        {
            selector: 'to',
            name: 'To'
            // width: 100
        },
        {
            selector: 'purpose',
            name: 'Purpose'
            // width: 200
        },

        {
            selector: '',
            name: 'Action',
            type: 'actions',
            cell: (params) => [
                <div className="actions_button">
                    <Button
                        style={{
                            borderRadius: '8px',
                            border: '1px solid  #DCDFE5',
                            background: '#F9FAFB',
                            color: '#1090CB',
                            fontSize: '14px',
                            fontWeight: '600',
                            lineHeight: 'normal'
                        }}
                        // onClick={() => handleAssignAsset(params)}
                    >
                        Assign
                    </Button>
                </div>
            ]
        }
    ];

    const data = [
        {
            id: '1',
            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '2',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '3',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '4',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '5',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestedBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '6',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        },
        {
            id: '7',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Real Construction Edit CAD Design'
        }
    ];
    return (
        <PageContainer pageHeading="Overview">
            <Grid container spacing={gridSpacing}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        marginTop: '20px'
                    }}
                >
                    <AssetsSummaryCardsView />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={8}>
                            <LineBarComboChart />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <DoughnutChart />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <ConstructDataTable
                        title="Assets request list"
                        enabledSearch={true}
                        // enableFilters={true}
                        data={data}
                        columns={columns}
                    />
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default withRouter(Dashboard);
