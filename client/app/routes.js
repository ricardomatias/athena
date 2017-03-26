import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint arrow-body-style: 0 */
export const CustomRoute = ({ component, renderIf, redirect, ...rest }) => {
  return (<Route {...rest} render={props => (
    renderIf ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: redirect,
        state: { from: props.location }
      }}
      />)
  )}
  />);
};

CustomRoute.propTypes = {
  renderIf: React.PropTypes.bool.isRequired,
  component: React.PropTypes.func.isRequired,
  redirect: React.PropTypes.string.isRequired,
  location: React.PropTypes.object
};
