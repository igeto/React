import { Mongo } from 'meteor/mongo';
import { Meteor } from "meteor/meteor";

import SimpleSchema from 'simpl-schema';

export const Restaurants = new Mongo.Collection('restaurants');

if (Meteor.isServer) {
    Meteor.publish('restaurants', () => {
        return Restaurants.find({});
    });
}

const Restaurant = new SimpleSchema({
    name: {
        type: String,
        max: 20
    },
    phoneNumbers: Array,
    'phoneNumbers.$': {
        type: String,
        regEx: [/^(?=.*[0-9])$/g]
    }    
});