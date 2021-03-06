import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from "meteor/tracker";

import { Restaurants } from "../../api/restaurants";
import { Navbar } from "./";

export class NewRestaurant extends React.Component {
    constructor() {
        super();
        this.state = {
            phoneNumbers: [''],
            menu: [{ name: '', price: 0, description: '' }],
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let restaurantName = this.refs.restaurantName.value.trim();
        Meteor.call('restaurants.insert', restaurantName, this.state.phoneNumbers, (err, res) => {
            if (err) {
                console.log(err)
                this.refs.restaurantName.value = ''
                this.state.phoneNumbers.map((number, i) => this.refs[`phonenumber${i}`].value = '')
                return;
            }
            browserHistory.replace('/restaurants')
        })
        // Restaurants.insert({ name: restaurantName, phoneNumber: [phoneNumber]});

    }

    handlePhoneNumberInput = i => e => {
        newNumbers = this.state.phoneNumbers.map((number, index) => i !== index ? number : e.target.value)
        this.setState({ phoneNumbers: newNumbers })
    }

    // TODO
    handleMenuItemInput = i => e => {
        menuItems = this .state.menu.map((menuItem, index) => i !== index ? menuItem : { ...menuItem, })
    }

    handleAddPhoneNumber() {
        return this.setState({ phoneNumbers: this.state.phoneNumbers.concat(['']) })
    }

    handleRemovePhoneNumber(i) {
        const filteredNumbers = this.state.phoneNumbers.filter((number, index) => i !== index)
        this.setState({ phoneNumbers: filteredNumbers })
        return
    }

    handlePhoneNumberInputFields() {
        return this.state.phoneNumbers.map((number, i) => {
            return (<div key={i}>
                <input type='text' ref={`phonenumber${i}`} name={`phonenumber ${i}`} placeholder='phone number' value={number} onChange={this.handlePhoneNumberInput(i)} />
                <button type="button" onClick={() => this.handleRemovePhoneNumber(i)} className="small">-</button>
            </div>)
        })
    }

    // TODO
    handleMenuItemInputFields() {
        return this.state.menu.map((item, i) => {
            return (<div>
                <input type='text' ref={`menuItemName${i}`} name={`menuItem${i}`} placeholder='meal name' value={item['name']}  />
                <input type='number' ref={`menuItemPrice${i}`} name={`menuItemPrice${i}`} placeholder='price' value={item['price']} />
                <textarea ref={`description${i}`} name={`description${i}`} value={item['description']} placeholder='enter description of the meal here' ></textarea>
            </div>)
        })
    }

    componentDidMount() {
        Meteor.subscribe('restaurants');
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='wrapper'>
                    <h1>Add new restaurant</h1>
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type='text' ref='restaurantName' name='restaurantName' placeholder='Restaurant name' />
                        {this.handlePhoneNumberInputFields()}
                        <button type='button' onClick={() => this.handleAddPhoneNumber()} >Add new phone number</button>
                        <button type='submit'>Add</button>
                    </form>
                </div>
            </div>
        );
    }
}