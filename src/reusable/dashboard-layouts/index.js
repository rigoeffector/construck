import React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));
const DashBoardLayoutForPage = ({title, actionButton, contents}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Item
                    style={{
                        textAlign: 'left',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#37435B'
                    }}
                >
                    {title}
                </Item>
            </Grid>
            <Grid
                item
                xs={4}
                style={{
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                <Item>{actionButton}</Item>
            </Grid>
            <Grid item xs={12}>
                <Item>{contents}</Item>
            </Grid>
        </Grid>
    );
};

export default DashBoardLayoutForPage;
