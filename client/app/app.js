import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { Login, Register, logoutUser, isUserAuthenticated } from './authentication';
import { Home, Navigation } from './components';
import { PublicRoute } from './routes';

import { bind } from './helpers';

class App extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(isUserAuthenticated());
  }

  logoutUser() {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  }

  render() {
    const { isAuthenticated, email } = this.props;

    return (
      <Router>
        <section className="section">
          <div className="container">
            <Navigation
              isAuthenticated={isAuthenticated}
              logoutUser={bind(this.logoutUser, this)}
              email={email}
            />

            <PublicRoute
              path="/login"
              component={Login}
              isAuthenticated={isAuthenticated}
            />
            <PublicRoute
              path="/register"
              component={Register}
              isAuthenticated={isAuthenticated}
            />
            <Route exact path="/" component={Home} isAllowed />
          </div>
        </section>
      </Router>
    );
  }
}

App.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  email: React.PropTypes.string
};

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.auth;

  return {
    isAuthenticated,
    email: user.email
  };
};

export default connect(mapStateToProps)(App);
