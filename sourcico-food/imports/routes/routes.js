import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Router, browserHistory } from 'react-router';

import { Signup, Link, NotFound, Login, Restaurant, NewRestaurant } from '../ui/components';
window.browserHistory = browserHistory;
window.accounts = Accounts;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/restaurants', '/restaurants/new'];

const onEnterPublicPage = () => {
    if (Meteor.userId())
        browserHistory.replace('/restaurants');
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId())
        browserHistory.replace('/');
};

export const onAuthChange = isAuthenticated => {
    const pathName = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);

    (isUnauthenticatedPage && isAuthenticated) ?
        browserHistory.replace('/restaurants') :
        (isAuthenticatedPage && !isAuthenticated) ?
            browserHistory.replace('/') : undefined;
};

export const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Login} onEnter={onEnterPublicPage} />
        <Route path='/signup' component={Signup} onEnter={onEnterPublicPage} />
        <Route path='/restaurants' component={Restaurant} onEnter={onEnterPrivatePage} />
        <Route path='/restaurants/new' component={NewRestaurant} onEnter={onEnterPrivatePage} />
        <Route path='*' component={NotFound} onEnter={onEnterPrivatePage} />
    </Router>
);