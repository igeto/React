import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*-/%?_])(?=.*[0-9])(?=.*[a-z]).{8,24}$/g))
            return this.setState({
                error: 'Password must be between 8-24 characters long and must contain at least one of each: special character, upper case letter, lower case letter and number'
            });

        Accounts.createUser({ email, password }, err => {
            window.err = err;
            !!err ? this.setState({ error: err.reason }) : this.setState({ error: '' });
        });
    }

    render() {
        return (
            <div>
                <h1>Create an account</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type='email' ref='email' name='email' placeholder='email' />
                    <input type='password' ref='password' name='password' placeholder='password' />
                    <button>Signup</button>
                </form>
                <Link to='/'>Already have an account?</Link>
            </div>
        );
    }
}
