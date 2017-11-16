import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import { Navbar } from "./";

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
        browserHistory.replace('/restaurant');
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='wrapper'>
                    <h1>Login to Sourcico Food</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className='login__padding' onSubmit={this.onSubmit.bind(this)} noValidate>
                        <div className='form'>
                            <div className='form__field' >
                                <div>
                                    <input className='form__input' type='email' ref='email' name='email' placeholder='email' />
                                </div>
                                <div>
                                    <input className='form__input' type='password' ref='password' name='password' placeholder='password' />
                                </div>
                            </div>
                            <div>
                                <button className='form__login' >Login</button>
                            </div>
                        </div>
                        <Link className='link__login' to='/signup'>Don't have an account?</Link>
                    </form>
                </div>
            </div>
        );
    }
}