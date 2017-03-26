import fetch from '../fetch';

import token from './token';

import { history } from '../router';

import { ERROR_MESSAGES } from '../config/constants';

import { loadCollections } from '../collections/state';


/**
 * AUTH
 */
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';

function requestAuth() {
  return {
    type: AUTH_REQUEST
  };
}

function receiveAuth(email, userToken) {
  return {
    type: AUTH_SUCCESS,
    payload: {
      email,
      userToken
    }
  };
}

function authError(message) {
  return {
    type: AUTH_FAILURE,
    payload: {
      errorMessage: message
    }
  };
}

function handleAuthResponse(promise, dispatch, redirect) {
  promise.then(res => res.json()).then((body) => {
    if (ERROR_MESSAGES.indexOf(body.type) !== -1) {
      return dispatch(authError(body.message));
    }

    token.set(body.token);

    dispatch(receiveAuth(body.email, body.token));

    dispatch(loadCollections({
      movies: body.movies,
      music: body.music,
      books: body.books
    }));

    if (redirect) {
      history.push('/');
    }
  }).catch((err) => {
    dispatch(authError(err.message));
  });
}

export function isUserAuthenticated() {
  return (dispatch) => {
    const { id } = token.decode();

    if (!id) {
      return;
    }

    dispatch(requestAuth());

    return handleAuthResponse(fetch(`/api/user/${id}`, { method: 'GET' }), dispatch, false);
  };
}

export function authenticateUser(type, creds) {
  const { email, password } = creds,
        config = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        };

  return (dispatch) => {
    dispatch(requestAuth());

    return handleAuthResponse(fetch(`/api/${type}`, config), dispatch, true);
  };
}


/**
 * LOGOUT
 */
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function logoutUser() {
  return (dispatch) => {
    token.remove();

    history.push('/');

    dispatch(logoutSuccess());
  };
}

/**
 * REDUCER
 */
export default function reducer(state = {
  isFetching: false,
  isAuthenticated: false
}, action) {
  switch (action.type) {
  case AUTH_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      errorMessage: ''
    });
  case AUTH_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: '',
      ...action.payload
    });
  case AUTH_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      ...action.payload
    });
  case LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false
    });
  default:
    return state;
  }
}
