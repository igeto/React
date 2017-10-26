import { Meteor } from 'meteor/meteor';
import SimpleSchema from "simpl-schema";

import { Restaurant } from '../imports/api/restaurants';
import '../imports/api/users';

Meteor.publish('restaurant', () => {
  return Restaurant.find({}).fetch();
})

Meteor.startup(() => {
  
});
