import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthForm from './auth-form';

import { authenticateUser } from './auth';

import { bind, toCamelCase } from '../helpers';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: null,
      password: null,
      validForm: false
    };
  }

  /* eslint "react/sort-comp": 0 */
  isFormValid() {
    if (this.state.email && this.state.password) {
      this.setState({ validForm: true });
    }
  }

/* eslint class-methods-use-this: 0 */
  isValid(id, target) {
    switch (id) {
    case 'email':
      return target.validity.valid;
    case 'password':
      return target.value.length >= 8;
    default:
      return false;
    }
  }

  componentDidUpdate() {
    if (!this.state.validForm) {
      this.isFormValid();
    }
  }

  onChange(event) {
    const target = event.target,
          id = toCamelCase(target.id);

    const isValid = this.isValid(id, target);

    if (isValid) {
      this.setState({ [id]: target.value.trim() });
    } else {
      this.setState({ [id]: false, validForm: false });
    }
  }

  onAuth(event) {
    const { email, password } = this.state,
          { dispatch } = this.props;

    event.preventDefault();

    dispatch(authenticateUser('login', { email, password }));
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
        isDisabled={!isValid.validForm}
        isValid={isValid}
        isLoading={this.props.isFetching}
      />
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps)(Login);
