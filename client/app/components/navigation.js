import React from 'react';

import { Link } from 'react-router-dom';

const Navigation = props => (
  <div className="columns">
    <div className="column is-offset-5 is-2">
      <Link to="/" className="title has-text-centered">
        <p>ATHENA</p>
      </Link>
    </div>
    <div className="column is-offset-3 is-2">
      { props.isAuthenticated ? (
        <div>
          <span>{props.email}</span>
          <button className="button is-primary is-outlined is-pulled-right" onClick={props.logoutUser}>Logout</button>
        </div>
      )
        : (
          <div>
            <Link to="/register">
              <button className="button is-primary is-pulled-right">Register</button>
            </Link>
            <Link to="/login">
              <button className="button is-primary is-outlined is-pulled-right">Login</button>
            </Link>
          </div>
        )
     }
    </div>
  </div>
);

Navigation.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logoutUser: React.PropTypes.func.isRequired,
  email: React.PropTypes.string
};

export { Navigation };
