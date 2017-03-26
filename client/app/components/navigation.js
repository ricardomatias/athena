import React from 'react';

import { Link } from '../router';

const Navigation = props => (
  <div className="container">
    <nav className="nav">
      <div className="nav-left">
        <Link href="/" className="nav-item">
          <p className="title">ATHENA</p>
        </Link>
      </div>
      <div className="nav-right">
        { props.isAuthenticated ? (
          <span className="nav-item">
            <p className="email">{props.email}</p>
            <button className="button is-primary is-outlined" onClick={props.logoutUser}>Logout</button>
          </span>
        )
          : (
            <div className="nav-item">
              <Link href="/login" classes="button is-info">
                <span>Login</span>
              </Link>
              <Link href="/register" classes="button is-primary">
                <span>Register</span>
              </Link>
            </div>
          )
       }
      </div>
    </nav>
  </div>
);

Navigation.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logoutUser: React.PropTypes.func.isRequired,
  email: React.PropTypes.string
};

export { Navigation };
