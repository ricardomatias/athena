import React from 'react';

import { preventTransition, capitalize, toCamelCase } from '../helpers';

const VALID_CLS = 'is-success',
      INVALID_CLS = 'is-danger';


const inputStateClass = (state, input) => {
  if (state[input] === null) {
    return '';
  }
  if (state[input]) {
    return VALID_CLS;
  }

  return INVALID_CLS;
};

const PasswordInput = props => (
  <div className="field">
    <p className="control has-icon">
      <input
        id={props.id}
        className={`${props.inputState} input`}
        type="password"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="icon is-small">
        <i className="fa fa-lock" />
      </span>
    </p>
  </div>
);

PasswordInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  inputState: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

const AuthForm = (props) => {
  const createPasswordInput = (id, placeholder) => (
    <PasswordInput
      id={id}
      key={id}
      placeholder={placeholder}
      onChange={props.onChange}
      inputState={inputStateClass(props.isValid, toCamelCase(id))}
    />
  );

  let passwordField = [ createPasswordInput('password', 'Password') ];

  if (props.passwordFields === 2) {
    passwordField = passwordField.concat(createPasswordInput('confirm-password', 'Confirm Password'));
  }
  return (
    <div className="column is-offset-3 is-6">
      <div className="card">
        <div className="card-content">
          <h2 className="subtitle">{ capitalize(props.route) }</h2>
          <form id="register" onSubmit={props.onAuth}>
            <div className="field">
              <p className="control has-icon">
                <input
                  id="email"
                  className={`${inputStateClass(props.isValid, 'email')} input`}
                  type="email"
                  placeholder="Email"
                  onChange={props.onChange}
                />
                <span className="icon is-small">
                  <i className="fa fa-envelope" />
                </span>
              </p>
            </div>
            { passwordField.map(field => (field)) }
            <div className="field">
              <p className="control">
                <button className={`button is-success ${props.isLoading ? 'is-loading' : ''}`} onChange={preventTransition} disabled={props.isDisabled}>
                  {props.submit}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  route: React.PropTypes.string.isRequired,
  submit: React.PropTypes.string.isRequired,
  passwordFields: React.PropTypes.number.isRequired,
  onAuth: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  isDisabled: React.PropTypes.bool.isRequired,
  isValid: React.PropTypes.object.isRequired,
  isLoading: React.PropTypes.bool.isRequired
};

export default AuthForm;
