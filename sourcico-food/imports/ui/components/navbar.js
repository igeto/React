import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

export class Navbar extends React.Component {
    onLogout() {
        Accounts.logout();
    }

    render() {
        let navClassName = Meteor.userId() ? 'nav-menu' : 'nav-menu hidden';
        return (
            <div className='title-bar'>
                <div className='wrapper-nav'>
                    <img className='nav-logo' src='http://sourcico.com/wp-content/uploads/sourcico-site-logo-dark-blue001.png' alt='sourcico logo' />
                    <ul className={navClassName}>
                        <li>
                            <div>Restaurants</div>
                        </li>
                        <li>
                            <div>Orders</div>
                        </li>
                        <li>
                            <div>Profile</div>
                        </li>
                        <li>
                            <div onClick={this.onLogout}>Logout</div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}