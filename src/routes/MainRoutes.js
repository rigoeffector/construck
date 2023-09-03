/* eslint-disable no-unused-vars */
import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';

import MainLayout from './../layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const AssetsPage = lazy(() => import('../views/assets'));
const InvoicesPage = lazy(() => import('../views/invoices/index'));
const Drivers = lazy(() => import('../views/drivers'));
const AllAssetsRequests = lazy(() => import('../views/allrequests'));
const Login  = lazy(() =>  import('../views/pages/authentication/login/mainlogin'));
const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                // '/auth/login',
                '/dashboard',
                '/dashboard/assets',
                '/dashboard/requests',
                '/dashboard/invoices',
                '/dashboard/drivers',
              
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                    {/* <Route path="/auth/login" component={Login} /> */}
                    <ProtectedRoute path="/dashboard/overview" component={DashboardDefault} />
                    <ProtectedRoute path="/dashboard/assets" component={AssetsPage} />
                    <ProtectedRoute path="/dashboard/requests" component={AllAssetsRequests} />
                    <ProtectedRoute path="/dashboard/invoices" component={InvoicesPage} />
                    <ProtectedRoute path="/dashboard/drivers" component={Drivers} />
                    
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
