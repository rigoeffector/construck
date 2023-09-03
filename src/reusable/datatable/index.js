/* eslint-disable no-unused-vars */
import React, {useMemo} from 'react';
import {Col} from 'react-bootstrap';

import DataTable from 'react-data-table-component';
// import FilterForm from '../../../components/leave/pages/summary/leave.requests/filter.form';
// import PopoverPopup from '../../buttons/popover';
import FilterComponent from './FilterComponent';
import FilterListIcon from '@mui/icons-material/FilterList';
// import { titleCase } from '../../../helpers';
import './style.css';
import {CircularProgress} from '@mui/material';
const ConstructDataTable = (props) => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems =  props?.data?.filter((item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
    const {enabledSearch, enableFilters, otherActions, disableHeight} = props;

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
                enableSearch={enabledSearch}
            />
        );
    }, [filterText, resetPaginationToggle, enabledSearch]);

    return (
        <div
            id="Leave_table_container"
            style={{
                background: '#edeff3',
                padding: '0px'
            }}
        >
            {enabledSearch && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '55px'
                    }}
                >
                    {<div>{subHeaderComponent}</div>}
                    {/* {enableFilters && (
            <PopoverPopup recallLeaves={''} title={'filters'} icon={<FilterListIcon />}>
              <Col md={12}>
                <p>Coming soon</p>
              </Col>
            </PopoverPopup>
          )} */}
                    {otherActions && <div>{otherActions}</div>}
                </div>
            )}

            {props.loading ? (
                <CircularProgress />
            ) : (
                <DataTable
                    className="dataTables_wrapper"
                    title={props.title && <p id="table_title_size">{props.title}</p>}
                    enabledSearch={enabledSearch}
                    enableFilters={enableFilters}
                    otherActions={otherActions && otherActions}
                    id="leave_table"
                    customStyles={{
                        rows: {
                            style: {
                                background: 'white',
                                height: disableHeight ? 'auto' : '72px',
                                color: '#6B7A99',
                                fontSize: '14px'
                            }
                        },
                        subHeader: {
                            style: {
                                display: 'flex',
                                // backgroundColor: '#edeff3',
                                justifyContent: 'flex-start',
                                paddingBottom: '20px!important'
                            }
                        },
                        headCells: {
                            style: {
                                paddingLeft: '8px', // override the cell padding for head cells
                                paddingRight: '8px',
                                fontSize: '14px',
                                fontWeight: '700',
                                textTransform: 'capitalize',
                                color: '#6B7A99',
                                background: {...(!props.headerBgColor ? '#f9fafd' : props.headerBgColor)}
                            }
                        },
                        cells: {
                            style: {
                                paddingLeft: '8px', // override the cell padding for data cells
                                paddingRight: '8px'
                            }
                        }
                    }}
                    columns={props.columns}
                    data={filteredItems}
                    defaultSortField="name"
                    // striped
                    noHeader={props.noHeader && true}
                    pagination
                    subHeader
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
                    highlightOnHover={props.highlightOnHover}
                />
            )}
        </div>
    );
};

export default ConstructDataTable;
