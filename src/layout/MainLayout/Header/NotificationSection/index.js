import React from 'react';

import {
    Avatar,
    Box,
    ButtonBase,
    makeStyles} from '@material-ui/core';


import {IconBell} from '@tabler/icons';

const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '330px',
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px'
            //maxWidth: '100%'
        }
    },
    listAction: {
        top: '22px'
    },
    actionColor: {
        color: theme.palette.grey[500]
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 205px)',
        overflowX: 'hidden'
    },
    listItem: {
        padding: 0
    },
    sendIcon: {
        marginLeft: '8px',
        marginTop: '-3px'
    },
    headerAvtar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.purple.light,
        color: theme.palette.purple.dark,
        '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.purple.main,
            color: theme.palette.purple.light
        }
    },
    cardContent: {
        padding: '0px !important'
    },
    notificationChip: {
        color: '#fff',
        backgroundColor: theme.palette.warning.dark
    },
    divider: {
        marginTop: 0,
        marginBottom: 0
    },
    listDivider: {
        marginTop: 0,
        marginBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listAvatarSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        border: 'none',
        borderColor: theme.palette.success.main
    },
    listAvatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        border: 'none',
        borderColor: theme.palette.primary.main
    },
    listContainer: {
        paddingLeft: '56px'
    },
    uploadCard: {
        backgroundColor: theme.palette.purple.light
    },
    cardAction: {
        padding: '10px',
        justifyContent: 'center'
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    box: {
        marginLeft: '16px',
        marginRight: '24px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '16px'
        }
    },
    bodyspacing: {
        padding: '16px 16px 0'
    },
    textboxspacing: {
        padding: '0px 16px'
    },
    itemaction: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            background: theme.palette.primary.light
        }
    }
}));

const NotificationSection = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Box component="span" className={classes.box}>
                <ButtonBase sx={{borderRadius: '12px'}}>
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvtar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <IconBell stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
        </React.Fragment>
    );
};

export default NotificationSection;
