import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from "meteor/tracker";

import { Restaurants } from "../../api/restaurants";
import { Navbar } from "./";

export class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            error: ''
        };
    }

    onClick() {
        browserHistory.replace('/restaurants/new');
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
        return this.state.restaurants.map(r => <div key={r._id}>{r.name}</div>);
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
                    <button onClick={this.onClick} >Add new restaurant</button>
                </div>
            </div>
        );
    }
}