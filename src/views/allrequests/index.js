import React, {useState, useEffect} from 'react';
import PageContainer from '../../reusable/breadcrumbs';
import DataTable from '../../reusable/table';
import {columns} from './table-column';
import {Box, Paper} from '@mui/material';
import {Search, SearchIconWrapper, TableInputBase} from './helpers';
import SearchIcon from '@mui/icons-material/Search';
import DateRange from '../../reusable/daterange';
import {addDays, differenceInDays} from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useDispatch, useSelector} from 'react-redux';
import {VIEW_ALL_REQUESTS_ASSETS_REQUEST} from '../../reducers/product/constant';
import {formatRequestedAssetsInfo} from '../../selectors/all.requested.assets';

const statusList = ['Completed', 'Assigned', 'Pending'];
const initialState = {
    from: null,
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
        dispatch({type: VIEW_ALL_REQUESTS_ASSETS_REQUEST});
    }, [dispatch]);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);

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

    console.log(formatRequestedAssetsInfo(listAssets))
    return (
        <PageContainer pageHeading="All requests">
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '2rem 0px '}}>
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
            </div>
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
                    showQuickSearchToolbar={false}
                    checkboxSelection={false}
                    rows={allRequests.data || []}
                    columns={columns}
                />
            </Paper>
        </PageContainer>
    );
};

export default AllAssetsRequests;
