import { Button, IconButton, Popover } from '@mui/material';
import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DateRangePicker } from '@scale8/mui-daterange-picker';
import { dateFormatting } from '../../views/allrequests/helpers';

const DateRange = ({
  period,
  handlePrevWeek,
  handleNextWeek,
  anchorEl,
  handleOpen,
  handleClose,
  handleDateRangeChange,
  maxDate,
  disableIcon
}) => {
  return (
    <div>
      <div
        style={{
          borderRadius: '5px',
          border: '1px solid var(--midas-color-grey-light)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <IconButton
          sx={{
            color: 'var(--midas-color-dark-blue)',
            borderRadius: '50px',
            margin: '0.25rem',
            cursor: 'pointer',
            border: '1px solid var(--midas-color-grey-light)'
          }}
          className='timesheet'
          onClick={handlePrevWeek}
        >
          <KeyboardArrowLeftIcon fontSize='small' />
        </IconButton>
        <Button onClick={handleOpen}>
          <Button onClick={handleOpen} sx={{ color: 'var(--midas-color-dark-blue)' }}>
            {dateFormatting(period.from)} - {dateFormatting(period.to)}
          </Button>
        </Button>
        <IconButton
          sx={{
            color: disableIcon ? 'var(--midas-color-grey-light)' : 'var(--midas-color-dark-blue)',
            borderRadius: '50px',
            margin: '0.25rem',
            cursor: disableIcon ? '' : 'pointer',
            border: '1px solid var(--midas-color-grey-light)'
          }}
          className='timesheet'
          disabled={disableIcon}
          onClick={handleNextWeek}
        >
          <KeyboardArrowRightIcon fontSize='small' className='timesheet' />
        </IconButton>
      </div>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <DateRangePicker
          maxDate={maxDate}
          definedRanges={[]}
          open={true}
          toggle={() => {
            handleClose();
          }}
          closeOnClickOutside={true}
          onChange={({ endDate, startDate }) => handleDateRangeChange(startDate, endDate)}
        />
      </Popover>
    </div>
  );
};

export default DateRange;
