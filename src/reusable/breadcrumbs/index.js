import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Box, Breadcrumbs, Container, Link, Typography} from '@mui/material';
import React from 'react';
import {AssetsIcon} from './icon';
import './index.css'
export default function PageContainer({pageHeading, children}) {
    return (
        <Container maxWidth={false}>
            <div>
                <Box className="mb-4">
                    <Typography
                        variant="h1"
                        gutterBottom
                        sx={{
                            color: '#4D5E80',
                            fontSize: '32px',
                            fontStyle: 'normal',
                            fontWeight: '500'
                        }}
                    >
                        {pageHeading}
                    </Typography>

                    {/* See: https://mui.com/material-ui/react-breadcrumbs */}
                    <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRightIcon sx={{color: '#4D5E80'}} fontSize="large" />}>
                        <Link
                            sx={{fontWeight: 600}}
                            href="#"
                            style={{
                                color: '#6B7A99',
                                textDecoration: 'none',
                                display: 'flex',
                                width: '100%',
                                padding: '0px 5px',
                                justifyContent: 'space-between'
                            }}
                        >
                            <AssetsIcon
                                sx={{
                                    marginRight: '5px'
                                }}
                            />{' '}
                            Assets
                        </Link>
                        <Link
                            style={{
                                color: '#6B7A99',
                                textDecoration: 'none',
                                display: 'flex'
                            }}
                        >
                            {pageHeading}
                        </Link>
                    </Breadcrumbs>
                </Box>
                <Box>
                    <main>{children}</main>
                </Box>
            </div>
        </Container>
    );
}
