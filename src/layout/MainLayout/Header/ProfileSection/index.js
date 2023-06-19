/* eslint-disable no-unused-vars */
import React from 'react';
import {useSelector} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Fade,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Popper,
    Typography,
    useTheme
} from '@material-ui/core';

import {IconLogout, IconSettings} from '@tabler/icons';

import User1 from './../../../../assets/images/users/user-round.svg';

const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvtar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        margin: '8px 0 8px 8px !important'
    },
    profileChip: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        // borderColor: theme.palette.primary.light,
        // backgroundColor: theme.palette.primary.light,
        // '&[aria-controls="menu-list-grow"], &:hover': {
        //     borderColor: theme.palette.primary.main,
        //     background: theme.palette.primary.main + '!important',
        //     color: theme.palette.primary.light,
        //     '& svg': {
        //         stroke: theme.palette.primary.light
        //     }
        // }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeyellow: {
        backgroundColor: theme.palette.warning.dark,
        color: '#fff'
    }
}));

const ProfileSection = () => {
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [selectedIndex] = React.useState(1);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleLogout = async () => {
        try {
            localStorage.clear();
            // FIX ME
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const {
        auth: {data}
    } = useSelector((state) => state);
    return (
        <React.Fragment>
            <Chip
                sx={{
                    background: '#b36b48!important'
                }}
                classes={{label: classes.profileLabel}}
                className={classes.profileChip}
                icon={
                    <Avatar
                        src={User1}
                        className={classes.headerAvtar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                // color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps, placement}) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <Card elevation={16}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container direction="column" spacing={0}>
                                            <Grid
                                                item
                                                className={classes.flex}
                                                sx={{
                                                    display: 'block !important'
                                                }}
                                            >
                                                <Typography
                                                    variant="h4"
                                                    sx={{
                                                        fontSize: '30px',
                                                        margin: '10px 0px',
                                                        fontWeight: '300',
                                                        color: '#b36a4a'
                                                    }}
                                                >
                                                    Welcome,
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="h4"
                                                    className={classes.name}
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: '700',
                                                        margin: '13px 0px'
                                                    }}
                                                >
                                                    {data?.username}
                                                    <Grid item>
                                                        <Typography variant="subtitle2">{data?.role}</Typography>
                                                    </Grid>
                                                </Typography>

                                                <Typography
                                                    component="span"
                                                    variant="h4"
                                                    className={classes.name}
                                                    sx={{
                                                        display: 'block',
                                                        fontSize: '12px',
                                                        color: '#a3a3a3',
                                                        margin: '10px 0px',
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    Last Login: {data?.last_login}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Divider />
                                        <PerfectScrollbar className={classes.ScrollHeight}>
                                            <Divider />

                                            <List component="nav" className={classes.navContainer}>
                                                <ListItem
                                                    className={classes.listItem}
                                                    sx={{borderRadius: customization.borderRadius + 'px'}}
                                                    button
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                </ListItem>
                                            </List>
                                        </PerfectScrollbar>
                                    </CardContent>
                                </Card>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default ProfileSection;
