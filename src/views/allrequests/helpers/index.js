import React from 'react';
import {styled} from '@mui/material/styles';
import {alpha} from '@material-ui/core/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputBase from '@mui/material/InputBase';
import MuiAutocomplete from '@mui/material/Autocomplete';
import {Avatar, Box, Tooltip, Typography} from '@mui/material';
import moment from 'moment';

export const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        variant="scrollable"
        style={{marginRight: 'auto', px: 2}}
        scrollButtons={false}
        TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan" />}}
    />
))({
    '& .MuiTabs-flexContainer': {
        // justifyContent: 'flex-start'
    },
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        height: '4px',
        backgroundColor: 'transparent'
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        borderRadius: '2px',
        width: '100%',
        backgroundColor: 'rgba(253, 103, 56, 1)'
    },
    '& .MuiTabs-root': {
        background: 'yellow'
    }
});

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({theme}) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    padding: '10px 10px',
    marginRight: theme.spacing(1),
    color: ' rgba(0, 0, 0, 0.5)',
    '&.Mui-selected': {
        fontWeight: 800,
        color: 'rgba(253, 103, 56, 1)'
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)'
    }
}));
export const Search = styled('div')(({theme}) => ({
    position: 'relative',
    ' marginTop': theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    background: 'white',
    '&:hover': {
        backgroundColor: 'white'
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(2.5),
        width: 'auto'
    }
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    background: 'white',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1'
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            }
        }
    }
}));

export const TableInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        background: 'white',
        borderRadius: '8px',
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: '70px',
        paddingTop: '18px',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '35ch',
            paddingLeft: '70px',
            paddingTop: '18px'
        }
    }
}));

export const Autocomplete = styled(MuiAutocomplete)({
    '.MuiAutocomplete-inputRoot': {
        color: 'var(--midas-color-dark-blue)',
        fontFamily: 'var(--font-family-monospace)',
        minHeight: '45px !important',
        height: 'auto !important',
        borderRadius: '8px',
        width: '100%',
        margin: 0,
        padding: 0
        // fontWeight: '600' later
    },
    '.MuiMenuItem-root': {
        fontFamily: 'var(--font-family-monospace)'
    },
    '.MuiInputLabel-root': {
        fontFamily: 'var(--font-family-monospace)',
        zIndex: 0
    },
    '.MuiAutocomplete-popper': {
        fontFamily: 'var(--font-family-monospace)'
    }
});

export const PersonAvatar = ({color, title, src}) => {
    return (
        <Tooltip title={title} arrow placement="top">
            <Avatar
                size="sm"
                alt={title}
                sx={{
                    bgcolor: 'var(--midas-color-grey-light)',
                    '&:hover': {marginRight: '8px'},
                    '& .MuiAvatar-root': {width: 32, height: 32, fontSize: '1rem', fontWeight: 700}
                }}
                src={src}
            />
        </Tooltip>
    );
};
export const AntTabs = styled(Tabs)({
    borderBottom: '1px solid none',
    width: '100%',
    border: '1px solid #eeee',
    background: 'white',
    borderRadius: '3px',
    margin: '3px 0px',
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent'
    }
});

export const AntTab = styled((props) => <Tab disableRipple {...props} />)(({theme}) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0
    },

    fontWeight: theme.typography.fontWeightRegular,
    color: '#4D5E80',
    paddingLeft: '25px',
    paddingRight: '25px',
    '&:hover': {
        color: '#000',
        opacity: 1
    },
    '&.Mui-selected': {
        borderRight: '1px solid #eeee',
        color: 'var(--midas-color-dark-blue)',
        background: '#F1F2F7',
        fontWeight: 700,
        margin: window.location.href.indexOf('payroll') > -1 ? '0rem' : '0.2rem'
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#F1F2F7'
    }
}));
export const status = {
    archived: 'Archived',
    active: 'Active',
    draft: 'Draft',
    pending: 'Pending'
};
export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
export function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

export const dateFormatting = (value) => {
    if (value) {
        return moment(value).format('DD MMM', {trim: false});
    }
    return '';
};
