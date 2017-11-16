import React from 'react';
import { Meteor } from "meteor/meteor";

import { Restaurants } from "../../api/restaurants";

export class Restaurant extends React.Component {
    handleRestaurantRemove() {
        Meteor.call('restaurants.remove', this.props.restaurant._id);
    }

    render() {
        // let itemClassName = `item item--position-${this.props.player.rank}`;

        return (
            <div key={this.props.restaurant._id}>
                <div >
                    <div>
                        <h3>
                            {this.props.restaurant.name}
                        </h3>
                    </div>
                    <div>
                        <p>Phone Numbers:</p>
                        <p>{this.props.restaurant.phoneNumbers[0]}</p>
                    </div>
                    <div>
                        <button onClick={this.handleRestaurantRemove.bind(this)}>X</button>
                    </div>               
                </div>
            </div>
       );
    }
}