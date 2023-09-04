import React, {useState, useEffect} from 'react';
import {Columns} from './table-column';
import {Box, Button, CircularProgress, Paper, Typography} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import {addDays, differenceInDays} from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PageContainer from '../../reusable/breadcrumbs';
import DateRange from '../../reusable/daterange';
import DataTable from '../../reusable/table';
import {Search, SearchIconWrapper, TableInputBase} from '../allrequests/helpers';
import {GET_INVOICES_LIST_REQUEST, UPDATE_INVOICE_STATUS_REQUEST} from '../../reducers/invoice/constant';
import {useDispatch, useSelector} from 'react-redux';
import ConstruckModal from '../../reusable/modal';
const statusList = ['Paid', 'Unpaid', 'Archived', 'Active', 'All'];
const initialState = {
    from: null,
    to: null,
    view: 'week'
};
const InvoicesPage = () => {
    const [searchField, setSearchField] = useState('');
    const [thisState, setThisState] = useState(initialState);
    const [distance, setDistance] = useState(6);
    const [anchorEl, setAnchorEl] = useState(false);
    const [showArchiveModel, setShowArchiveModel] = useState(false);
    const [moreInfo, setMoreInfo] = useState({});
    const {
        listInvoices,
        updateInvoice: {success: updateSuccess, loading: updateStatusLoading},
        createInvoice: {success: createSuccess}
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_INVOICES_LIST_REQUEST
        });
    }, [dispatch]);

    useEffect(() => {
        if (createSuccess || updateSuccess) {
            handleClose();
        }
    }, [createSuccess, updateSuccess]);

    const handleChangeStatus = (data) => {
        setShowArchiveModel(true);
        const {row} = data;
        setMoreInfo(row);
    };

    const handleDelete = (data) => {
        console.log(data);
    };

    const handleDownload = (data) => {
        console.log(data);
    };
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
        setShowArchiveModel(false);
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

    const handleArchiveConfirm = () => {
        const payload = {
            status: 'ARCHIVE',
            id: moreInfo.id
        };
        dispatch({type: UPDATE_INVOICE_STATUS_REQUEST, payload});
    };

    return (
        <PageContainer pageHeading="Invoicing">
            <Typography
                sx={{
                    color: '#6B7A99',
                    fontSize: '20px',
                    fontWeight: '500',
                    margin: '10px 0px'
                }}
            >
                View and send invoices to you clients
            </Typography>
            <ConstruckModal title="Archive asset" show={showArchiveModel} handleClose={handleClose}>
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    Are you sure you want to archive{' '}
                    <span
                        style={{
                            fontWeight: '700',
                            color: '#282546'
                        }}
                    >
                        {` ${moreInfo.invoiceNumber} Invoice`}
                    </span>
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            margin: '0px 10px',
                            borderRadius: '8px',
                            background: '#EDEFF2',
                            color: '#64748A !important',
                            fontWeight: '500'
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleArchiveConfirm}
                        variant="contained"
                        sx={{
                            borderRadius: '8px',
                            background: '#1090CB',
                            color: '#FFF',
                            fontWeight: '500'
                        }}
                    >
                        {updateStatusLoading ? (
                            <CircularProgress
                                size={20}
                                sx={{
                                    color: 'white'
                                }}
                            />
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </Box>
            </ConstruckModal>
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
                <div style={{background: '#fff', borderRadius: '8px', margin: '0.5em 0px'}}>
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
                    loader={listInvoices?.loading}
                    showQuickSearchToolbar={false}
                    rows={listInvoices?.data}
                    columns={Columns(handleDownload, handleChangeStatus, handleDelete)}
                />
            </Paper>
        </PageContainer>
    );
};

export default InvoicesPage;
