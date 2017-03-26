import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bind, toCamelCase } from '../helpers';

import AuthForm from './auth-form';

import { authenticateUser } from './auth';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: null,
      password: null,
      confirmPassword: null,
    };
  }

  /* eslint "react/sort-comp": 0 */
  arePasswordsEqual() {
    const { password, confirmPassword } = this.state;
    return (password && confirmPassword) && password === confirmPassword;
  }

  isFormValid() {
    if (this.state.email && this.arePasswordsEqual()) {
      this.setState({ validForm: true });
    }
  }

  isValid(id, target) {
    switch (id) {
    case 'email':
      return target.validity.valid;
    case 'password':
      return target.value.length >= 8;
    case 'confirmPassword':
      return target.value.length >= 8 && target.value === this.state.password;
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
      this.setState({ [id]: target.value });
    } else {
      this.setState({ [id]: false, validForm: false });
    }
  }

  onAuth(event) {
    const { email, password } = this.state,
          { dispatch } = this.props;

    event.preventDefault();

    dispatch(authenticateUser('register', { email, password }));
  }

  render() {
    const isValid = {
      ...this.state
    };

    return (
      <AuthForm
        route="register"
        submit="Create New Account"
        passwordFields={2}
        onAuth={bind(this.onAuth, this)}
        onChange={bind(this.onChange, this)}
        isDisabled={!isValid.validForm}
        isValid={isValid}
        isLoading={this.props.isFetching}
      />
    );
  }
}

Register.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps)(Register);
