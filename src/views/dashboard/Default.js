/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {gridSpacing} from '../../store/constant';
import ConstructDataTable from '../../reusable/datatable/index';
import PageContainer from '../../reusable/breadcrumbs';
import {Button, CircularProgress} from '@mui/material';
import AssetsSummaryCardsView from './summary';
import DoughnutChart from './donout';
import LineBarComboChart from './lineChart';
import ConstruckModal from '../../reusable/modal';
import AssignInternalAssetForm from '../assets/form/assign.internal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
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
        {
            selector: 'amount',
            name: 'Invoice Amount'
            // width: 200
        },
        {
            selector: 'dueDate',
            name: 'Invoice Due Date',
            cell: (params) => moment(params.row.dueDate).format('YYYY-MM-DD')
            // width: 200
        },
        {
            selector: 'invoiceNumber',
            name: 'Invoice Number',
          
            // width: 200
        },
        {
            selector: 'invoiceStatus',
            name: 'Invoice Status',
          
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
                        onClick={() => handleAssign(params)}
                    >
                        Assign
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
    const handleClose = () => {
        setShowAssignModal(false);
    };

    return (
        <PageContainer pageHeading="Overview">
            <ConstruckModal show={showAssignModal} title={`Create ${moreInfo.assetName} 's Invoice for ${moreInfo.email}`} handleClose={handleClose}>
                <CreateAssetInvoiceForm moreInfo={moreInfo}/>
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
                    {listAssetsLoading ? <CircularProgress/>: (
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
