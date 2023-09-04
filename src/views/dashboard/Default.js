/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {gridSpacing} from '../../store/constant';
import ConstructDataTable from '../../reusable/datatable/index';
import PageContainer from '../../reusable/breadcrumbs';
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import AssetsSummaryCardsView from './summary';
import DoughnutChart from './donout';
import LineBarComboChart from './lineChart';
import ConstruckModal from '../../reusable/modal';
import {useDispatch, useSelector} from 'react-redux';
import {VIEW_ALL_REQUESTS_ASSETS_REQUEST} from '../../reducers/product/constant';
import {formatRequestedAssetsInfo} from '../../selectors/all.requested.assets';
import CreateAssetInvoiceForm from '../invoices/form/create.invoice.form';
import moment from 'moment';
const Dashboard = () => {
    const {
        auth,
        listRequestedAssets: {data: listAssets, loading: listAssetsLoading}
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [moreInfo, setMoreInfo] = useState({});
    const [allRequests, setAllRequests] = useState([]);
    const [showMoreViewModal, setShowMoreViewModal] = useState(false);
    useEffect(() => {
        dispatch({type: VIEW_ALL_REQUESTS_ASSETS_REQUEST});
    }, [dispatch]);
    useEffect(() => {
        if (listAssets && !listAssetsLoading) {
            setAllRequests(formatRequestedAssetsInfo(listAssets));
        }
    }, [listAssets, listAssetsLoading]);

    const columns = [
        {
            selector: 'assetName',
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
        // {
        //     selector: 'invoice.amount',
        //     name: 'Invoice Amount'
        //     // width: 200
        // },
        // {
        //     selector: 'invoice.dueDate',
        //     name: 'Invoice Due Date',
        //     cell: (params) => (params.row.dueDate ? moment(params.row.dueDate).format('YYYY-MM-DD') : '-------')
        //     // width: 200
        // },
        // {
        //     selector: 'invoice.invoiceNumber',
        //     name: 'Invoice Number'

        //     // width: 200
        // },
        // {
        //     selector: 'invoice.invoiceStatus',
        //     name: 'Invoice Status'

        //     // width: 200
        // },
        {
            selector: '',
            name: 'Assign',
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
                        onClick={() => handleAssign(params)}
                    >
                        Assign
                    </Button>
                </div>
            ]
        },
        {
            selector: '',
            name: 'More',
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
                        onClick={() => handleViewMore(params)}
                    >
                        View More
                    </Button>
                </div>
            ]
        }
    ];

    const handleAssign = (data) => {
        setShowAssignModal(true);
        console.log(data);
        setMoreInfo(data);
    };

    const handleViewMore = (data) => {
        setShowMoreViewModal(true);
        console.log(data);
        setMoreInfo(data);
    };
    const handleClose = () => {
        setShowAssignModal(false);
        setShowMoreViewModal(false);
    };

    return (
        <PageContainer pageHeading="Overview">
            <ConstruckModal show={showMoreViewModal} title={`More information`} handleClose={handleClose}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Name</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.assetName}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Status</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.assetStatus}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Type</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.assetType}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Category</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.category}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Condition</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.condition}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Manufacture Date</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moment(moreInfo?.manufacturedDate).format('YYYY-MM-DD')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Requested By</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.requestedBy}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Requestor Type</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.requestorType}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Tin Number</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.tinNumber ? moreInfo?.tinNumber: '-------'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Request From</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moment(moreInfo?.from).format('YYYY-MM-DD')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Request To</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moment(moreInfo?.to).format('YYYY-MM-DD')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Purpose</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.purpose}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #ddd',
                                padding: '5px 0px'
                            }}
                        >
                            <Typography>Asset Customer Name</Typography>
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    color: '#494577'
                                }}
                            >
                                {moreInfo?.customerName? moreInfo?.customerName: '------'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ConstruckModal>
            <ConstruckModal
                show={showAssignModal}
                title={`Create invoice for ${moreInfo.requestedBy}`}
                handleClose={handleClose}
            >
                <CreateAssetInvoiceForm moreInfo={moreInfo} />
            </ConstruckModal>
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
                    {listAssetsLoading ? (
                        <CircularProgress />
                    ) : (
                        <ConstructDataTable
                            title="Assets request list"
                            enabledSearch={true}
                            // enableFilters={true}
                            loading={listAssetsLoading}
                            data={(!listAssetsLoading && allRequests?.data) || []}
                            columns={columns}
                        />
                    )}
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default withRouter(Dashboard);
