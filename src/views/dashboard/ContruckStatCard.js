import {Box, Card, Typography} from '@mui/material';
import React from 'react';
import {Image} from 'react-bootstrap';

export default function ConstruckStatCard(props) {
    return (
        <>
            <Card
                className="midas-stat-card p-4"
                sx={{
                    backgroundColor: props.color,

                    height: '100px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{display: 'flex'}}>
                    <Box className="mr-4" sx={{width: 40}}>
                        <Image style={{width: 'auto', height: 'auto'}} src={props.icon} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" component="h3" sx={{textAlign: 'left', fontSize: '13px', textTransform: 'uppercase'
                        }}>
                            {props.title}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                textAlign: 'left',
                                color: '#465674',
                                fontSize: '18px',
                                fontWeight: '500',
                                textTransform: 'uppercase'
                            }}
                        >
                            {props.data ?? '-'}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </>
    );
}
