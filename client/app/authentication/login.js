import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import { bind } from '../helpers';

import AuthForm from './auth-form';


class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: null,
      password: null
    };

    this.validForm = false;
  }

  onChange(event) {
    const target = event.target;
    // this.setState({ [target.type]: event.target.value });
  }

  onAuth(event) {
    event.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json()).then((body) => {
      const { token, email } = body;

      localStorage.setItem('__token', token);
    });
  }

  render() {
    const isValid = {
      ...this.state
    };

    return (
      <AuthForm
        route="login"
        submit="Login"
        passwordFields={1}
        onAuth={bind(this.onAuth, this)}
        onChange={bind(this.onChange, this)}
        isDisabled={!this.validForm}
        isValid={isValid}
      />
    );
  }
}

export { Login };
