import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from "meteor/tracker";

import { Restaurants } from "../../api/restaurants";

export class NewRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let menu = '';
        let restaurantName = this.refs.restaurantName.value.trim();
        let phoneNumber = this.refs.phoneNumber.value.trim();
        this.refs.menu ? menu = this.refs.menu.value.trim() : menu = '';

        Restaurants.insert({ name: restaurantName, phoneNumber: [phoneNumber], menu: [menu] });
        browserHistory.replace('/restaurants');
    }

    componentDidMount() {
        Meteor.subscribe('restaurants');
    }

    componentWillUnmount() {
    };

    render() {
        return (
            <div>
                <h1>Add new restaurant</h1>
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type='text' ref='restaurantName' name='restaurantName' placeholder='Restaurant name' />
                    <input type='text' ref='phoneNumber' name='phoneNumber' placeholder='02-1234-567' />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}