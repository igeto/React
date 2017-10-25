import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from '../imports/ui/components/App';
import { Restaurant } from '../imports/api/restaurants';



Meteor.startup(() => {
  let restaurants = Restaurant.find({}).fetch();
  ReactDOM.render(<App restaurants={restaurants} />, document.getElementById('app'));
});