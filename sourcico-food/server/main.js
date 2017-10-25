import { Meteor } from 'meteor/meteor';
import { Restaurant } from '../imports/api/restaurants';

Meteor.startup(() => {
  for (let i = 0; i < 3; i++) {
    let restaurant = new Restaurant({
      name: `name ${i}`
    });
    restaurant.save();
  }
  // code to run on server at startup
});
