import React, {useState} from 'react';
import {columns} from './table-column';
import {Box, Paper, Typography} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import {addDays, differenceInDays} from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PageContainer from '../../reusable/breadcrumbs';
import DateRange from '../../reusable/daterange';
import DataTable from '../../reusable/table';
import {Search, SearchIconWrapper, TableInputBase} from '../allrequests/helpers';
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

    const data = [
        {
            id: '1',
            number: 'ASD4555',
            invoiceDate: '2023/08/12',
            dueDate: '2023/09/12',
            description: 'You must pay this bill before due date',
            company: 'Pesa Choice',
            amount: '123,000',
            status: 'Active'
        },
        {
            id: '2',
            number: 'ASD4555AWE',
            invoiceDate: '2023/08/12',
            dueDate: '2023/09/12',
            description: 'You must pay this bill before due date',
            company: 'Benefactors',
            amount: '103,809,000',
            status: 'Paid'
        },
        {
            id: '3',
            number: 'ASD4555',
            invoiceDate: '2023/08/12',
            dueDate: '2023/09/12',
            description: 'You must pay this bill before due date',
            company: 'Pesa Choice',
            amount: '123,000',
            status: 'Active'
        },
        {
            id: '4',
            number: 'ASD455W45AWE',
            invoiceDate: '2023/08/12',
            dueDate: '2023/09/12',
            description: 'You must pay this bill before due date',
            company: 'Benefactors Focus',
            amount: '13,809,000',
            status: 'Paid'
        },
        {
            id: '5',
            number: 'ASD455W45AWE',
            invoiceDate: '2023/08/12',
            dueDate: '2023/09/12',
            description: 'You must pay this bill before due date',
            company: 'Benefactors Focus',
            amount: '13,809,000',
            status: 'Archived'
        },

        {
            id: '6',
            number: 'ASD455W45AWE',
            invoiceDate: '2023/08/12',
            dueDate: '2023/09/12',
            description: 'You must pay this bill before due date',
            company: 'Benefactors Focus',
            amount: '13,809,000',
            status: 'Unpaid'
        }
    ];
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
                <DataTable showQuickSearchToolbar={false} rows={data} columns={columns()} />
            </Paper>
        </PageContainer>
    );
};

export default InvoicesPage;
