import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CompanyRequestAssetForm from './company.form';
import IndividualRequestAssetForm from './individual.form';
import {useDispatch, useSelector} from 'react-redux';
import {GET_ALL_TYPES_LIST_REQUEST} from '../../../../../reducers/product/constant';
import {CircularProgress} from '@material-ui/core';

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export const Contact = () => {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();

    const {listAssetTypes} = useSelector((state) => state);

    useEffect(() => {
        dispatch({type: GET_ALL_TYPES_LIST_REQUEST});
    }, [dispatch]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div id="contact">
            <Box sx={{width: '100%'}}>
                <Box
                    sx={{
                        width: '100%',
                        transform: 'translate(40%, 50%)',
                        margin: '30px 0px',
                        height: '150px'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '30px',
                            fontWeight: '400',
                            lineHeight: '189.5%'
                        }}
                    >
                        Request a construck Asset
                    </Typography>
                    <span>Lorem Ipsum is simply dummy text of the printing </span>
                </Box>

                <Box sx={{borderBottom: 0, display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Company" {...a11yProps(0)} />
                        <Tab label="Individual" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {listAssetTypes.loading ? (
                            <CircularProgress />
                        ) : (
                            listAssetTypes && listAssetTypes?.data && <CompanyRequestAssetForm typesData={listAssetTypes?.data} />
                        )}
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {listAssetTypes.loading ? (
                            <CircularProgress />
                        ) : (
                            listAssetTypes && listAssetTypes?.data && <IndividualRequestAssetForm typesData={listAssetTypes?.data} />
                        )}
                    </Box>
                </CustomTabPanel>
            </Box>
        </div>
    );
};

export default Contact;
