/* eslint-disable no-unused-vars */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {DataGrid, GridLinkOperator, GridToolbarExport, GridToolbar, GridToolbarQuickFilter} from '@mui/x-data-grid';
import './index.css';
import {Box, Grid, withStyles} from '@material-ui/core';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {CircularProgress, Stack} from '@mui/material';
import * as XLSX from 'xlsx';
const useStyles = makeStyles(() => ({
    root: {
        background: 'white',
        border: '1px solid #ddd !important',
        fontWeight: '600',
        borderRadius: '.5rem !important',
        margin: '0px 10px !important',
        height: '40px',
        color: '#465674 !important',
        '&:hover': {
            background: 'white !important',
            color: '#465674 !important',
            border: '2px solid #465674 !important'
        }
    }
}));

const StyledDataGrid = withStyles({
    root: {
        '& .MuiDataGrid-renderingZone': {
            maxHeight: 'none !important'
        },
        '& .MuiDataGrid-cell': {
            color: '#465674',
            fontSize: '14px',
            height: '72px !important',
            borderBottom: '1px solid #ddd !important',
            lineHeight: 'unset !important',
            maxHeight: 'none !important',
            whiteSpace: 'normal'
        },
        '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #ddd !important'
        },
        '& .MuiDataGrid-footerContainer': {
            border: 'none !important'
        },
        '& .MuiDataGrid-row': {
            maxHeight: 'none !important',
            fontFamily: 'var(--font-family-monospace)'
        },
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '500',
            color: '#465674',
            fontSize: '13px',
            fontFamily: 'var(--font-family-monospace)'
        },
        '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
            display: 'none'
        },
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none'
        },
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none'
        }
    }
})(DataGrid);

export function DataTable(props, disableColumnFilter, loading, idName) {
    const {
        rows,
        columns,
        rowsPerPageOptions = [],
        onSelectionModelChange,
        selectionModel,
        dropdownItems,
        dropdownFilterItems = true,
        onRowSelected,
        allowFilters,
        actions = [],
        identifier,
        loader,
        checkboxSelection = true,
        enabledFilters = true,
        showQuickSearchToolbar = true
    } = props;
    const [pageSize, setPageSize] = React.useState(5);
    const [isExportDropdownOpen, setIsExportDropdownOpen] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState('');
    const getColumnsToExport = (columns) => {
        // Filter out columns with type "actions"
        return columns.filter((column) => column.type !== 'actions').map((column) => column.field);
    };
    const styles = {
        filterInput: {
            border: '1px solid #ccc',
            borderRadius: 4,
            paddingLeft: 8,
            paddingRight: 8
        }
    };

    const filterColumns = ({field, columnz, currentFilters}) => {
        // remove already filtered fields from list of columnz
        const filteredFields = currentFilters?.map((item) => item.field);
        return columnz
            .filter((colDef) => colDef.filterable && (colDef.field === field || !filteredFields.includes(colDef.field)))
            .map((column) => column.field);
    };

    const getColumnForNewFilter = ({currentFilters, columnz}) => {
        const filteredFields = currentFilters?.map(({field}) => field);
        const columnForNewFilter = columnz
            .filter((colDef) => colDef.filterable && !filteredFields.includes(colDef.field))
            .find((colDef) => colDef.filterOperators?.length);
        return columnForNewFilter?.field ?? null;
    };

    const handleExport = () => {
        setIsExportDropdownOpen(!isExportDropdownOpen);
        // Filter out columns with type "checkbox" and "actions"
        const columnsToExport = columns
            .filter(
                (column) =>
                    column.field !== 'checkbox' &&
                    column.type !== 'actions' &&
                    column.field !== 'status' &&
                    column.field !== '' &&
                    column.field !== 'driver'
            )
            .map((column) => column.field);

        // Prepare the data for export
        const dataForExport = rows.map((row) => {
            const rowData = {};
            columnsToExport.forEach((field) => {
                rowData[field] = row[field];
            });
            return rowData;
        });

        // Create a worksheet and workbook using XLSX
        const ws = XLSX.utils.json_to_sheet(dataForExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DataGrid Export');

        // Save the workbook as a file
        XLSX.writeFile(wb, 'construck-report.xlsx');
    };
    function QuickSearchToolbar() {
        return (
            <Stack id="filter_wrapper" sx={!enabledFilters ? {marginBottom: '30px'} : {}}>
                <Box
                    sx={
                        {
                            // p: 4,
                            // pb: 0
                        }
                    }
                    id={identifier ? identifier : 'search_table_v2'}
                >
                    <GridToolbarQuickFilter
                        quickFilterParser={(searchInput) =>
                            searchInput
                                .split(',')
                                .map((value) => value.trim())
                                .filter((value) => value !== '')
                        }
                    />
                </Box>

                <Box
                    id="filter_astest"
                    sx={
                        !enabledFilters
                            ? {
                                  display: 'none'
                              }
                            : {}
                    }
                >
                    <div>
                        {isExportDropdownOpen ? (
                            // Render the export options when the dropdown is open
                            <Button
                                variant="outlined"
                                onClick={handleExport}
                                sx={{
                                    width: '200px'
                                }}
                            >
                                Download Report
                            </Button>
                        ) : (
                            // Render a button to open the dropdown when it's closed
                            <Button
                                variant="outlined"
                                onClick={handleExport}
                                sx={{
                                    width: '200px'
                                }}
                            >
                                Download Report
                            </Button>
                        )}
                    </div>
                    {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={[
                            {label: 'Available', value: 'AVAILABLE'},
                            {label: 'UnAvailable', value: 'UNAVAILABLE'},
                            {label: 'Assigned', value: 'ASSIGNED'}
                        ]}
                        sx={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Status" />}
                    /> */}
                </Box>
            </Stack>
        );
    }

    return (
        <>
            <div className={idName} style={{width: '100%'}}>
                {selectionModel?.length > 0 &&
                    dropdownFilterItems &&
                    actions.map((action, actionIdx) => (
                        <Button
                            key={actionIdx}
                            variant="outlined"
                            sx={{
                                margin: '0.5rem',
                                textTransform: 'none',
                                color: 'var(--dark-blue-500)',
                                backgroundColor: '#F7F9FC',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)'
                            }}
                            onClick={action.click}
                        >
                            {action.name}
                        </Button>
                    ))}
                <StyledDataGrid
                    sx={{
                        boxShadow: 0,
                        border: 0,
                        color: 'rgb(26 26 26 / 87%)',
                        borderColor: 'red',
                        '& .MuiDataGrid-cell': {
                            whiteSpace: 'normal',
                            padding: '7px 0px'
                        }
                    }}
                    // slots={{ toolbar: GridToolbar }}
                    loading={loader}
                    showQuickSearchToolbar={showQuickSearchToolbar}
                    components={{
                        Toolbar: showQuickSearchToolbar && QuickSearchToolbar,
                        Export: showQuickSearchToolbar && GridToolbarExport
                    }}
                    exportOptions={{
                        columns: getColumnsToExport(columns), // Use the function to get columns to export
                        fileName: 'exported-data',
                        exportButtonLabel: 'Export'
                    }}
                    componentsProps={{
                        toolbar: {
                            className: idName,
                            filterToolbarButton: {
                                overrides: {
                                    FilterInput: {
                                        style: styles.filterInput
                                    }
                                }
                            }
                        }
                    }}
                    slots={{toolbar: GridToolbar}}
                    slotProps={{
                        filterPanel: {
                            filterFormProps: {
                                filterColumns
                            },
                            getColumnForNewFilter
                        }
                    }}
                    disableColumnSelector
                    disableDensitySelector
                    enabledFilters={enabledFilters}
                    columns={columns}
                    rows={rows || []}
                    checkboxSelection={false}
                    disableSelectionOnClick={true}
                    onSelectionModelChange={onSelectionModelChange}
                    selectionModel={selectionModel}
                    dropdownItems={dropdownItems}
                    dropdownFilterItems={dropdownFilterItems}
                    onRowSelected={onRowSelected}
                    autoHeight
                    id={Math.random()}
                    pagination
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={rowsPerPageOptions}
                    getRowId={(r) => r.id}
                    density={'standard'}
                    getRowHeight={() => 'auto'}
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterLogicOperator: GridLinkOperator.Or
                            }
                        }
                    }}
                />
            </div>
        </>
    );
}
export default DataTable;
