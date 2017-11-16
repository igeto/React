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

Meteor.methods({
    'restaurants.insert'(name, [...phoneNumbers]) {
        check(name, String);
        check(phoneNumbers, [String]);
        if(!Meteor.userId()) {
            throw new Meteor.Error('not authorized', 'You have to be logged in to add a new restaurant');
        }
        try {
            new SimpleSchema({
                name: {
                    type: String,
                    max: 20
                },
                phoneNumbers: Array,
                'phoneNumbers.$': {
                    type: String,
                    regEx: [/\d/g],
                    min: 9
                }
            }).validate({ name, phoneNumbers });
        } catch (error) {
            throw new Meteor.Error('wrong information', 'Please enter correct information');
        }
        Restaurants.insert({ name, phoneNumbers });
    },
    'restaurants.remove'(id) {
        console.log('id:',id);
        check(id, String);
        if(!Meteor.userId()) {
            throw new Meteor.Error('not authorized', 'You have to be logged in to add a new restaurant');
        }
        Restaurants.remove({ _id: id });
    }
});