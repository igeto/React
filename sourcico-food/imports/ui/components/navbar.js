import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { browserHistory } from "react-router/lib";

export class Navbar extends React.Component {
    onLogout() {
        Accounts.logout();
    }

    goToRestaurants() {
        browserHistory.push('/restaurants')
    }

    goToOrders() {
        browserHistory.push('/orders')
    }

    goToProfile() {
        browserHistory.push('/profile')
    }

    render() {
        let navClassName = Meteor.userId() ? 'nav-menu' : 'nav-menu hidden';
        return (
            <div className='title-bar'>
                <div className='wrapper-nav'>
                    <img className='nav-logo' src='http://sourcico.com/wp-content/uploads/sourcico-site-logo-dark-blue001.png' alt='sourcico logo' />
                    <ul className={navClassName}>
                        <li>
                            <div onClick={this.goToRestaurants.bind(this)}>Restaurants</div>
                        </li>
                        <li>
                            <div onClick={this.goToOrders.bind(this)}>Orders</div>
                        </li>
                        <li>
                            <div onClick={this.goToProfile.bind(this)}>Profile</div>
                        </li>
                        <li>
                            <div onClick={this.onLogout.bind(this)}>Logout</div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}