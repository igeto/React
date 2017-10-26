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

        Accounts.createUser({ email, password }, err => {
            !!err ? this.setState({ error: err.reason }) : this.setState({ error: '' });
        });
    }

    render() {
        return (
            <div>
                <h1>Create an account</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type='email' ref='email' name='email' placeholder='email' />
                    <input type='password' ref='password' name='password' placeholder='password' />
                    <button>Signup</button>
                </form>
                <Link to='/'>Already have an account?</Link>
            </div>
        );
    }
}
