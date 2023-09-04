/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {Columns} from './table-column';
import {Box, Button, Chip, CircularProgress, Grid, Paper, Typography} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import {Table} from 'reactstrap';

import {addDays, differenceInDays} from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PageContainer from '../../reusable/breadcrumbs';
import DateRange from '../../reusable/daterange';
import DataTable from '../../reusable/table';
import {Search, SearchIconWrapper, TableInputBase} from '../allrequests/helpers';
import {CREATE_INVOICE_RESET, GET_INVOICES_LIST_REQUEST, UPDATE_INVOICE_STATUS_REQUEST} from '../../reducers/invoice/constant';
import {useDispatch, useSelector} from 'react-redux';
import ConstruckModal from '../../reusable/modal';
import moment from 'moment';
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
    const [showPaidModel, setShowPaidModel] = useState(false);
    const [showArchiveModel, setShowArchiveModel] = useState(false);
    const [moreInfo, setMoreInfo] = useState({});
    const [showInvoiceModel, setShowInvoiceModel] = useState(false);
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
        setShowPaidModel(true);
        console.log(data);
        setMoreInfo(data);
    };

    const handleDelete = (data) => {
        setShowArchiveModel(true);
        console.log(data);
        setMoreInfo(data);
    };

    const handleDownload = (data) => {
        setShowInvoiceModel(true);
        console.log(data);
        setMoreInfo(data);
    };
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
        setShowArchiveModel(false);
        setShowPaidModel(false);
        setShowInvoiceModel(false);

        dispatch({
            type: CREATE_INVOICE_RESET
        });
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

    const handlePaidConfirm = () => {
        const payload = {
            status: 'PAID',
            id: moreInfo.id
        };
        dispatch({type: UPDATE_INVOICE_STATUS_REQUEST, payload});
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

            <ConstruckModal title="Change invoice status" show={showArchiveModel} handleClose={handleClose}>
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    Are you sure you want to archive this{' '}
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
            <ConstruckModal title="Mark this invoice" show={showPaidModel} handleClose={handleClose}>
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '30px 0px'
                    }}
                >
                    Are you sure you want to mark as Paid this{' '}
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
                        onClick={handlePaidConfirm}
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

            <ConstruckModal title="View invoice" show={showInvoiceModel} handleClose={handleClose}>
                <Grid>
                    <img src="/assets/images/logo.png" alt=''/>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '20px'
                        }}
                    >
                        <Box
                            sx={{
                                margin: '10px'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    margin: '5px 0px '
                                }}
                            >
                                Tax Invoice
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '15px',
                                    margin: '5px 0px '
                                }}
                            >
                                Bill To {moreInfo?.companyName ? moreInfo.companyName : '--------'}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                margin: '10px'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    margin: '5px 0px '
                                }}
                            >
                                Invoice Number {moreInfo.invoiceNumber}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '15px',
                                    margin: '5px 0px '
                                }}
                            >
                                Date {moment(moreInfo.createdAt).format('YYYY-MM-DD')}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '15px',
                                    margin: '5px 0px '
                                }}
                            >
                                Due Date {moment(moreInfo.dueDate).format('YYYY-MM-DD')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container>
                        <Table
                            size="sm"
                            style={{
                                width: '100%'
                            }}
                        >
                            <thead
                                style={{
                                    background: '#dadada'
                                }}
                            >
                                <tr>
                                    <th>Description</th>
                                    <th>TAX</th>
                                    <th>QTY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{moreInfo.description}</td>
                                    <td>{moreInfo.taxAmount}</td>
                                    <td>1</td>
                                    <td>{moreInfo.amount}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Box sx={{width: '170px'}}>
                            <Grid container>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        marginBottom: '10px',
                                        marginTop: '20px'
                                    }}
                                >
                                    <Typography>SubTotal</Typography>
                                    <Typography>{moreInfo.amount || 0}</Typography>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                                    <Typography>Taxes</Typography>
                                    <Typography>{moreInfo.taxAmount || 0}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        marginBottom: '10px',
                                        borderBottom: '1px solid #dddd'
                                    }}
                                >
                                    <Typography>Total</Typography>
                                    <Typography>{moreInfo.taxAmount + moreInfo.amount || 0}</Typography>
                                </Box>

                                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                                    <Typography>Balance Due</Typography>
                                    <Typography> RWF {moreInfo.taxAmount + moreInfo.amount || 0}</Typography>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                                    <Typography>Status</Typography>
                                    {moreInfo.invoiceStatus === 'ACTIVE' ? (
                                        <Chip
                                            label={moreInfo.invoiceStatus}
                                            color="primary"
                                            sx={{
                                                width: '100px !important',
                                                textAlign: 'center'
                                            }}
                                        />
                                    ) : moreInfo.invoiceStatus === 'PAID' ? (
                                        <Chip
                                            label={moreInfo.invoiceStatus}
                                            color="success"
                                            sx={{
                                                width: '100px !important',
                                                textAlign: 'center'
                                            }}
                                        />
                                    ) : moreInfo.invoiceStatus === 'UNPAID' ? (
                                        <Chip
                                            label={moreInfo.invoiceStatus}
                                            color="warning"
                                            sx={{
                                                width: '100px !important',
                                                textAlign: 'center'
                                            }}
                                        />
                                    ) : (
                                        <Chip label={moreInfo.invoiceStatus} />
                                    )}
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </ConstruckModal>
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
            </div> */}
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
                    showQuickSearchToolbar={true}
                    rows={listInvoices?.data}
                    columns={Columns(handleDownload, handleChangeStatus, handleDelete)}
                />
            </Paper>
        </PageContainer>
    );
};

export default InvoicesPage;
