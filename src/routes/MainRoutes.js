import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import MainLayout from './../layout/MainLayout';
import FirebaseLogin from '../views/pages/authentication/login/FirebaseLogin';

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
                '/user/login',
                '/dashboard/home',
                '/dashboard/products',
                '/dashboard/product-details',
                '/dashboard/delivery-tracking',
                '/dashboard/transactions',
                '/dashboard/checkout',
                '/dashboard/settings',
                '/dashboard/users',
                '/dashboard/vendors',

            ]}
        >
            <MainLayout showBreadcrumb={true}>
                <Switch location={location} key={location.pathname}>
                    <Route path="/user/login" component={FirebaseLogin} />
                    <Route path="/dashboard/home" component={DashboardDefault} />
                    <Route path="/dashboard/products" component={ProductsPage} />
                    <Route path="/dashboard/product-details" component={ProductDetailsPage} />
                    <Route path="/dashboard/delivery-tracking" component={DeliveryTrackingPage} />
                    <Route path="/dashboard/transactions" component={TransactionsPage} />
                    <Route path="/dashboard/settings" component={SettingsPage} />
                    <Route path="/dashboard/checkout" component={OrderCheckoutPage} />
                    <Route path="/dashboard/users" component={UsersListPage} />
                    <Route path="/dashboard/vendors" component={Vendors} />
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
