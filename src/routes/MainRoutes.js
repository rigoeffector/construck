import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';

import MainLayout from './../layout/MainLayout';
// import FirebaseLogin from '../views/pages/authentication/login/FirebaseLogin';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const ProductsPage = lazy(() => import('../views/products'));
const ProductDetailsPage = lazy(() => import('../views/productDetails'));
const DeliveryTrackingPage = lazy(() => import('../views/deliveryTracking'));
const OrderCheckoutPage = lazy(() => import('../views/orderCheckout'));
const TransactionsPage = lazy(() => import('../views/transactions'));
const SettingsPage = lazy(() => import('../views/settings'));
const UsersListPage = lazy(() => import('../views/users'));
const Vendors = lazy(() => import('../views/vendors'));

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                // '/user/login',
                '/dashboard',
                '/dashboard/products',
                '/dashboard/product-details',
                '/dashboard/delivery-tracking',
                '/dashboard/transactions',
                '/dashboard/checkout',
                '/dashboard/settings',
                '/dashboard/users',
                '/dashboard/vendors'
            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                    {/* <Route path="/user/login" component={FirebaseLogin} /> */}
                    <ProtectedRoute exact path="/dashboard" component={DashboardDefault} />
                    <ProtectedRoute path="/dashboard/products" component={ProductsPage} />
                    <ProtectedRoute path="/dashboard/product-details" component={ProductDetailsPage} />
                    <ProtectedRoute path="/dashboard/delivery-tracking" component={DeliveryTrackingPage} />
                    <ProtectedRoute path="/dashboard/transactions" component={TransactionsPage} />
                    <ProtectedRoute path="/dashboard/settings" component={SettingsPage} />
                    <ProtectedRoute path="/dashboard/checkout" component={OrderCheckoutPage} />
                    <ProtectedRoute path="/dashboard/users" component={UsersListPage} />
                    <ProtectedRoute path="/dashboard/vendors" component={Vendors} />
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
