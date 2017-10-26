import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

import { Signup, Link, NotFound, Login } from '../imports/ui/components';
window.browserHistory = browserHistory;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

const onEnterPublicPage = () => {
  if (Meteor.userId())
    browserHistory.replace('/link');
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId())
    browserHistory.replace('/');
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} onEnter={onEnterPublicPage} />
    <Route path='/signup' component={Signup} onEnter={onEnterPublicPage} />
    <Route path='/link' component={Link} onEnter={onEnterPrivatePage} />
    <Route path='*' component={NotFound} onEnter={onEnterPrivatePage} />
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.user();
  const pathName = browserHistory.getCurrentLocation().pathname;

  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  (isUnauthenticatedPage && isAuthenticated) ?
    browserHistory.replace('/link') :
    (isAuthenticatedPage && !isAuthenticated) ?
      browserHistory.replace('/') : undefined;
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});