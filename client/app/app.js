import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Login, Register, logoutUser, isUserAuthenticated } from './authentication';
import { Collections } from './collections';
import { Home, Navigation } from './components';

import { bind } from './helpers';

import { history } from './router';

const ROUTES = {
  '/': {
    component: Home
  },
  '/login': {
    component: Login,
    redirect: '/'
  },
  '/register': {
    component: Register,
    redirect: '/'
  },
  '/movies': {
    component: Collections('movies'),
    redirect: '/login',
    protected: true
  },
  '/music': {
    component: Collections('music'),
    redirect: '/login',
    protected: true
  },
  '/books': {
    component: Collections('books'),
    redirect: '/login',
    protected: true
  }
};

function validateRoute(pathname, isAuthenticated) {
  const route = ROUTES[pathname];

  if (!route) {
    return '/';
  }

  if (route.protected && !isAuthenticated) {
    history.push(route.redirect);

    return route.redirect;
  }

  return pathname;
}

class App extends Component {
  constructor(props) {
    super(props);

    let url = props.pathname;

    if (!ROUTES[url]) {
      url = '/';

      history.push('/');
    }

    this.state = {
      pathname: url
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(isUserAuthenticated());
  }

  componentDidMount() {
    history.onChange((pathname) => {
      this.setRoute(pathname);
    });

    window.addEventListener('popstate', () => {
      this.setRoute(location.pathname);
    });
  }

  setRoute(pathname) {
    const { isAuthenticated } = this.props;

    this.setState({ pathname: validateRoute(pathname, isAuthenticated) });
  }

  logoutUser() {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  }

  render() {
    const { isAuthenticated, email } = this.props,
          { pathname } = this.state;

    const ActiveRoute = (ROUTES[pathname] || ROUTES['/']).component;

    return (
      <div>
        <Navigation
          isAuthenticated={isAuthenticated}
          logoutUser={bind(this.logoutUser, this)}
          email={email}
        />

        <ActiveRoute pathname={pathname} />
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string,
  pathname: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  const { isAuthenticated, email } = state.auth;

  return {
    isAuthenticated,
    email
  };
};

export default connect(mapStateToProps)(App);
