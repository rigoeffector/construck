/* eslint-disable no-unused-vars */
import {Grid, Paper} from '@mui/material';
import React, {useEffect} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
// import { states } from '../../../constants';
import StatCardWidget from './StatCardWidget';

export default function AssetsSummaryCardsView({data}) {
    //
    // React hooks
    //

    const dispatch = useDispatch();

    //
    // React state
    //

    //   const {
    //     countAsset: { data: countAssetState },
    //     countAvailableAsset: { data: countAvailableAssetState },
    //     countAssignedAsset: { data: countAssignedAssetState }
    //   } = useSelector((state: RootStateOrAny) => state);

    //
    // React effects
    //

    //
    // JSX Component
    //
    const summaryData = [
        {
            title: 'Total Available Assets',
            icon: '/assets/images/purple.svg',
            data: data?.totalAvailableAssets,
            color: '#F6F0FD'
        },
        {
            title: 'Total Assigned Assets',
            icon: '/assets/images/green.svg',
            data: data?.totalAssignedAssets,
            color: '#F0FDF8'
        },
        {
            title: 'Total Paid Assets',
            icon: '/assets/images/orange.svg',
            data: data?.totalPaidAssets,
            color: '#FDF7F0'
        },
        {
            title: 'Total Unpaid Assets',
            icon: '/assets/images/purple.svg',
            data: data?.totalUnpaidAssets,
            color: 'rgba(16, 144, 203, 0.24)'
        }
    ];

    return (
        <Paper
            className="py-4 px-2"
            sx={{
                height: '125px',
                padding: '0px',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Grid container rowGap={2}>
                {summaryData.map((instance, index) => (
                    <Grid item xs={12} md={3} lg={3}>
                        <StatCardWidget item={instance} key={`stats-${index}`} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}
