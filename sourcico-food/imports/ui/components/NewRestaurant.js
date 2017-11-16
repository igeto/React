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
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let restaurantName = this.refs.restaurantName.value.trim();
        Meteor.call('restaurants.insert', restaurantName, this.state.phoneNumbers, (err, res) => {
            if (err) {
                console.log(err)
                this.refs.restaurantName.value = '';
                this.refs.phoneNumber.value = '';
                return;
            }
            browserHistory.replace('/restaurants');
        });
        // Restaurants.insert({ name: restaurantName, phoneNumber: [phoneNumber]});

    }

    handlePhoneNumberInput = i => e => {
        newNumbers = this.state.phoneNumbers.map((number, index) => {
            return i !== index ? number : e.target.value
        })
        this.setState({ phoneNumbers: newNumbers })
    }

    handleAddPhoneNumber() {
        new Promise((res, rej) => {
            if (res)
                return this.setState({ phoneNumbers: this.state.phoneNumbers.concat(['']) })
        }).then(console.log(this.state.phoneNumbers))
    }

    handleRemovePhoneNumber(i) {
        const filteredNumbers = this.state.phoneNumbers.filter((number, index) => i !== index)
        this.setState({ phoneNumbers: filteredNumbers })
        console.log(i)
        return
    }

    handlePhoneNumberInputFields() {
        return this.state.phoneNumbers.map((number, i) => {
            return (<div key={i}>
                <input type='text' ref='phoneNumber' name={`phonenumber ${i}`} placeholder='02-1234-567' value={number} onChange={this.handlePhoneNumberInput(i)} />
                <button type="button" onClick={() => this.handleRemovePhoneNumber(i)} className="small">-</button>
            </div>)
        })
    }

    componentDidMount() {
        Meteor.subscribe('restaurants');
    }

    componentWillUnmount() {
    };
    showState() {
        console.log(this.state.phoneNumbers)
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='wrapper'>
                    <h1>Add new restaurant</h1>
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type='text' ref='restaurantName' name='restaurantName' placeholder='Restaurant name' />
                        {/* <input type='text' ref='phoneNumber' name='phoneNumber' placeholder='02-1234-567' /> */}
                        {this.handlePhoneNumberInputFields()}
                        <button type='button' onClick={() => this.handleAddPhoneNumber()} >Add new phone number</button>
                        <button type='submit'>Add</button>
                    </form>
                </div>
                <button onClick={this.showState.bind(this)}>Test</button>
            </div>
        );
    }
}