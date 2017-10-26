import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import App from '../imports/ui/components/App';


Meteor.startup(() => {
    Meteor.subscribe('restaurant');
    let restaurants = Restaurant.find({}).fetch();
    ReactDOM.render(<App restaurants={restaurants}/>, document.getElementById('app'));
});