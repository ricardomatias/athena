import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import auth from './app/authentication/auth';
import collections from './app/collections/state';

import App from './app';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(applyMiddleware(thunkMiddleware, createLogger()));

const reducers = combineReducers({ auth, collections });

const store = createStore(reducers, middleware);


ReactDOM.render(
  (<Provider store={store}>
    <App pathname={location.pathname} />
  </Provider>),
  document.getElementById('root')
);
