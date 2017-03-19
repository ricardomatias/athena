import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint arrow-body-style: 0 */
export const PublicRoute = ({ component, isAuthenticated, ...rest }) => {
  return (<Route {...rest} render={props => (
    !isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}
      />)
  )}
  />);
};

PublicRoute.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  component: React.PropTypes.func.isRequired,
  location: React.PropTypes.object
};
