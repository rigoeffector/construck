/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import PageContainer from '../../reusable/breadcrumbs';
import DataTable from '../../reusable/table';
import {Columns, columns} from './table-column';
import {Box, Grid, Paper, Typography} from '@mui/material';
import {Search, SearchIconWrapper, TableInputBase} from './helpers';
import SearchIcon from '@mui/icons-material/Search';
import DateRange from '../../reusable/daterange';
import {addDays, differenceInDays} from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useDispatch, useSelector} from 'react-redux';
import {VIEW_ALL_REQUESTS_ASSETS_REQUEST} from '../../reducers/product/constant';
import {formatRequestedAssetsInfo} from '../../selectors/all.requested.assets';
import moment from 'moment';
import ConstruckModal from '../../reusable/modal';

const statusList = ['Completed', 'Assigned', 'Pending'];
const initialState = {
    from: null,
    moreInfo: {},
    showMoreModel: false,
    to: null,
    view: 'week'
};
const AllAssetsRequests = () => {
    const [searchField, setSearchField] = useState('');
    const [thisState, setThisState] = useState(initialState);
    const [distance, setDistance] = useState(6);
    const [anchorEl, setAnchorEl] = useState(false);
    const {
        listRequestedAssets: {data: listAssets, loading: listAssetsLoading}
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [allRequests, setAllRequests] = useState([]);
    useEffect(() => {
        dispatch({
            type: VIEW_ALL_REQUESTS_ASSETS_REQUEST,
            payload: {
                status: ''
            }
        });
    }, [dispatch]);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
        setThisState((prev) => ({
            ...prev,
            showMoreModel: false,
            moreInfo: {}
        }));
        // setSelectedEvent(null);
    };
    const handlePrevWeek = () => {
        setThisState((prevState) => ({
            ...prevState,
            from: addDays(thisState.from, -distance - 1),
            to: addDays(thisState.to, -distance - 1)
        }));
    };

    const handleNextWeek = () => {
        setThisState((prevState) => ({
            ...prevState,
            from: addDays(thisState.from, distance + 1),
            to: addDays(thisState.to, distance + 1)
        }));
    };
    const handleDateRangeChange = (startDate, endDate) => {
        if (endDate !== undefined && startDate !== undefined) {
            setThisState((prevState) => ({
                ...prevState,
                from: startDate,
                to: endDate
            }));
            setDistance(differenceInDays(endDate, startDate));
            handleClose();
        }
    };

    useEffect(() => {
        if (listAssets && !listAssetsLoading) {
            setAllRequests(formatRequestedAssetsInfo(listAssets));
        }
    }, [listAssets, listAssetsLoading]);

    const handleViewMore = (data) => {
        const {row} = data;
        console.log(row);
        setThisState((prev) => ({
            ...prev,
            showMoreModel: true,
            moreInfo: row
        }));
    };
    return (
        <PageContainer pageHeading="All requests">
            {/* <div style={{display: 'flex', justifyContent: 'space-between', margin: '2rem 0px '}}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon fontSize="medium" sx={{color: 'var(--midas-color-dark-blue)'}} />
                    </SearchIconWrapper>
                    <TableInputBase
                        className="search-tb"
                        placeholder="Search…"
                        value={searchField}
                        onChange={({target}) => setSearchField(target.value)}
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
                <Box
                    sx={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        marginTop: '7px'
                    }}
                >
                    <Paper
                        sx={{
                            background: '#fff',
                            padding: '0px',
                            width: '450px',

                            borderRadius: '12px'
                        }}
                    >
                        <Autocomplete
                            id="status-autocomplete"
                            options={statusList}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} label="Status" variant="outlined" fullWidth />}
                            PaperProps={{
                                style: {
                                    maxHeight: '200px'
                                }
                            }}
                            sx={{
                                background: '#edeff3'
                            }}
                        />
                    </Paper>
                </Box>
                <div style={{background: '#fff', borderRadius: '8px', margin: '0.5em'}}>
                    <DateRange
                        period={thisState}
                        handlePrevWeek={handlePrevWeek}
                        handleNextWeek={handleNextWeek}
                        anchorEl={anchorEl}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        handleDateRangeChange={handleDateRangeChange}
                    />
                </div>
            </div> */}
            <ConstruckModal show={thisState.showMoreModel} title={`More information`} handleClose={handleClose}>
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
                                {thisState.moreInfo?.assetName}
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
                                {thisState.moreInfo?.status}
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
                                {thisState.moreInfo?.assetType}
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
                                {thisState.moreInfo?.category}
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
                                {thisState.moreInfo?.condition}
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
                                {moment(thisState.moreInfo?.manufacturedDate).format('YYYY-MM-DD')}
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
                                {thisState.moreInfo?.requestedBy}
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
                                {thisState.moreInfo?.requestorType}
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
                                {thisState.moreInfo?.tinNumber ? thisState.moreInfo?.tinNumber : '-------'}
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
                                {moment(thisState.moreInfo?.from).format('YYYY-MM-DD')}
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
                                {moment(thisState.moreInfo?.to).format('YYYY-MM-DD')}
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
                                {thisState.moreInfo?.purpose}
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
                                {thisState.moreInfo?.customerName ? thisState.moreInfo?.customerName : '------'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ConstruckModal>

            <Paper
                className="py-4 px-2"
                sx={{
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <DataTable
                    loader={listAssetsLoading}
                    showQuickSearchToolbar={true}
                    checkboxSelection={false}
                    rows={allRequests.data || []}
                    columns={Columns(handleViewMore)}
                />
            </Paper>
        </PageContainer>
    );
};

export default AllAssetsRequests;
