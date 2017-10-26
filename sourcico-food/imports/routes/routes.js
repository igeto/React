import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Router, browserHistory } from 'react-router';

import { Signup, Link, NotFound, Login } from '../ui/components';
window.browserHistory = browserHistory;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

const onEnterPublicPage = () => {
    if (Meteor.userId())
        browserHistory.replace('/link');
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
        browserHistory.replace('/link') :
        (isAuthenticatedPage && !isAuthenticated) ?
            browserHistory.replace('/') : undefined;
};

export const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Login} onEnter={onEnterPublicPage} />
        <Route path='/signup' component={Signup} onEnter={onEnterPublicPage} />
        <Route path='/link' component={Link} onEnter={onEnterPrivatePage} />
        <Route path='*' component={NotFound} onEnter={onEnterPrivatePage} />
    </Router>
);