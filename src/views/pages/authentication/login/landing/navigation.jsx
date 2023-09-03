import React from 'react';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import FirebaseLogin from '../FirebaseLogin';
import { Button } from '@mui/material';
;
export const Navigation = (props) => {
    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                    >
                        {' '}
                        <span className="sr-only">CONSTRUCK</span> <span className="icon-bar"></span> <span className="icon-bar"></span>{' '}
                        <span className="icon-bar"></span>{' '}
                    </button>
                    <a className="navbar-brand page-scroll" href="#page-top">
                        <img
                            src="/assets/images/logo.png"
                            alt=""
                            style={{
                                width: '100%',
                                height: '30px'
                            }}
                        />
                    </a>{' '}
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="#team" className="page-scroll">
                                Home{' '}
                            </a>
                        </li>
                        <li>
                            <Button
                            variant='contained'
                                component={Link}
                                to="/login/auth"
                                sx={{
                                    borderRadius: '10px !important',
                                    background: '#1090CB',
                                    height: '40px',
                                    width: '125px',
                                    color: 'white !important',
                                    fontSize: '14px !important',
                                    textAlign: 'center',
                                    
                                    fontWeight: '700 !important',
                                    '&:hover': {
            color: 'white !important', // Change text color on hover
            background: '#1090CB !important', // Change background to transparent on hover
        },
                                }}
                            >
                                Login
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <Switch>
                <Route path="/auth/login" component={FirebaseLogin} />
            </Switch>
        </nav>
    );
};
