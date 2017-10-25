import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

export const Restaurants = new Mongo.Collection('restaurants');

export const Restaurant = Class.create({
    name: 'Restaurant',
    collection: Restaurants,
    fields: {
        name: String
    }
});