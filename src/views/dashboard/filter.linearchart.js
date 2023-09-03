import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function YearPicker() {
  const currentYear = new Date().getFullYear();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const textFieldRef = useRef(null); // Ref to the TextField element

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    handleCloseMenu();
  };

  const renderYearOptions = () => {
    const years = [];

    for (let year = currentYear - 20; year <= currentYear + 20; year++) {
      years.push(
        <MenuItem key={year} onClick={() => handleYearSelect(year)}>
          {year}
        </MenuItem>
      );
    }

    return years;
  };

  

  return (
    <div>
      <TextField
        type="text"
        value={selectedYear}
        onClick={handleOpenMenu}
        variant="outlined"
        InputProps={{
          readOnly: true,
          style: { width: '70px' }, // Dynamically set the width
        }}
        inputRef={textFieldRef} // Set the ref to the TextField element
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{ style: { width: 'calc(2% + 50px)' } }}
      >
        {renderYearOptions()}
      </Menu>
    </div>
  );
}

export default YearPicker;
