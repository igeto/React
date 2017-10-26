import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

export class Login extends React.Component {
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

        Meteor.loginWithPassword({ email }, password, err => {
            !!err ? this.setState({ error: err.reason }) : this.setState({ error: '' });
        });
        browserHistory.push('/link');
    }

    render() {
        return (
            <div>
                <h1>Login to Sourcico Food</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type='email' ref='email' name='email' placeholder='email' />
                    <input type='password' ref='password' name='password' placeholder='password' />
                    <button>Login</button>
                </form>

                <Link to='/signup'>Don't have an account?</Link>
            </div>
        );
    }
}