/* eslint-disable no-unused-vars */
import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {auth} = useSelector((state) => state);

    return (
        <Route {...rest} render={(props) => (auth.data && auth.data.JWT_TOKEN ? <Component {...props} auth={auth} /> : <Redirect to="/" />)} />
    );
};

export default ProtectedRoute;
