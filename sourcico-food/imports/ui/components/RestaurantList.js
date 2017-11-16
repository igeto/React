import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from "meteor/tracker";

import { Restaurants } from "../../api/restaurants";
import { Navbar, Restaurant } from "./";

export class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            error: ''
        };
    }

    handleAddNewRestaurant() {
        browserHistory.push('/restaurants/new');
    }

    handleDeleteRestaurant(id) {
        const restaurantToRemove = this.state.restaurants.filter(r => r._id === id);
        Meteor.call('restaurants.remove', restaurantToRemove);
    }

    componentDidMount() {
        Meteor.subscribe('restaurants');
        this.restaurantsTracker = Tracker.autorun(() => {
            this.setState({ restaurants: Restaurants.find().fetch() })
        });

    }

    componentWillUnmount() {
        this.restaurantsTracker.stop();
    };

    renderRestaurants() {
       return this.state.restaurants.length === 0 ? <div>There are no restaurants</div> :
        this.state.restaurants.map(r => <Restaurant key={r._id} restaurant={r} />);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='wrapper'>
                    <h1>Restaurants</h1>
                    <div>
                        {this.renderRestaurants()}
                    </div>
                    <button onClick={this.handleAddNewRestaurant} >Add new restaurant</button>
                </div>
            </div>
        );
    }
}