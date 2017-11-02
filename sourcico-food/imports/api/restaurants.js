import { Mongo } from 'meteor/mongo';
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

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
    },
    menu: Array,
    'menu.$': {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.methods({
    'restaurants.insert'(name, [...phoneNumbers]) {
        check(name, String);
        check(phoneNumbers, [String]);
        if(!Meteor.userId()) {
            throw new Meteor.Error('not authorized', 'You have to be logged in to add a new restaurant');
        }
        Restaurants.insert({ name: name, phoneNumbers: phoneNumbers });
    }
})