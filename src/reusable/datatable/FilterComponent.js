import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
const Input = styled.input.attrs((props) => ({
  type: 'text',
  size: props.small ? 5 : undefined,
  display: props.enableSearch ? 'flex !important' : 'none !important'
}))`
  height: 40px;
  width: 263px;
  position: relative;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  background: #ffffff;
  border: 1px solid #ced6da;s
  box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
  border-radius: 4px;
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  position: relative;
  width: 40px;
  background: #f7f8fa;
  color: #ddd;
  font-weight: bold;
  border: 1px solid #ddd;
  left: 225px;
  bottom: 40px;
`;

const FilterComponent = ({ filterText, onFilter, onClear, enableSearch }) => (
  <>
    <Input
      id='search'
      type='text'
      placeholder='Search '
      value={filterText}
      onChange={onFilter}
      enableSearch={enableSearch}
    />
    <ClearButton
    // onClick={onClear}
    >
      <SearchIcon
        style={{
          color: '#52627d'
        }}
      />
    </ClearButton>
  </>
);

export default FilterComponent;
