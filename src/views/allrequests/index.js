import React, {useState} from 'react';
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

    const data = [
        {
            id: '1',
            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela Den',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'MBODO Defv',
            status: 'Completed'
        },
        {
            id: '2',

            name: 'Mouse',
            category: 'Truck',
            requestBy: 'Tuse NGANJI',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Doe Johne',
            status: 'Assigned'
        },
        {
            id: '3',

            name: 'Cables Phone',
            category: 'Dump',
            requestBy: 'Aline UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Rgi Wacu',
            status: 'Pending'
        },
        {
            id: '4',

            name: 'Car',
            category: 'Truck',
            requestBy: 'Carine MWIZA',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Olga NSHUTI',
            status: 'Completed'
        },
        {
            id: '5',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestedBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'MANZ Emmy',
            status: 'Pending'
        },
        {
            id: '6',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'Devotha Ruth',
            status: 'Assigned'
        },
        {
            id: '7',

            name: 'Computer Laptop',
            category: 'Dump Truck',
            requestBy: 'Angela UWACU',
            from: '2023/09/12',
            to: '2025/09/23',
            purpose: 'KALSA Emmy',
            status: 'Completed'
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
                <DataTable showQuickSearchToolbar={false} checkboxSelection={false} rows={data} columns={columns()} />
            </Paper>
        </PageContainer>
    );
};

export default AllAssetsRequests;
