import {Button} from '@mui/material';
import React from 'react'; 
export const Header = (props) => {


  
    return (
        <header id="header">
            <div className="intro">
                <div className="overlay">
                    <div className="container">
                        <div
                            className="row"
                            style={{
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <div className="col-md-8">
                                <p
                                    style={{
                                        color: '#000',

                                        fontSize: '40px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Construck{' '}
                                    <span
                                        style={{
                                            color: '#1090CB',
                                            fontSize: '40px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Asset Management
                                    </span>
                                </p>
                                <p>
                                    Trust us to streamline your operations, increase productivity, and maximize your return on investment.we
                                    offer comprehensive solutions to optimize your asset utilization, reduce downtime, and enhance overall
                                    project performance.
                                </p>
                                   <Button
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#1090CB',
                                        height: '40px',
                                        width: '125px',
                                        color: 'white',
                                        fontSize: '14px'
                                    }}
                                    // onClick={navigateToLogin} // Call the navigateToLogin function on button click
                                >
                                    Request asset
                                </Button>
                            </div>
                            <div className="col-md-4">
                                <img
                                    src="/img/user.png"
                                    alt=""
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
