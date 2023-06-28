import React from 'react';
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import config from './../../../config';

const LogoSection = () => {
    return (
        <React.Fragment>
            <Link component={RouterLink} to={config.defaultPath}>
                <img
                    src={'/assets/images/logo.png'}
                    alt="DaaDa"
                    style={{
                        height: '100%',
                        width: '30%'
                    }}
                />
            </Link>
        </React.Fragment>
    );
};

export default LogoSection;
