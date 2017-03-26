import fetch from '../fetch';

import token from '../authentication/token';

import { ERROR_MESSAGES } from '../config/constants';

/**
 * COLLECTIONS
 */
const COLLECTIONS_LOAD = 'COLLECTIONS_LOAD',
      COLLECTION_ADD = 'COLLECTION_ADD',
      COLLECTION_REMOVE = 'COLLECTION_REMOVE',
      COLLECTION_FAILURE = 'COLLECTION_FAILURE',
      SEARCH_SUCCESS = 'SEARCH_SUCCESS',
      SEARCH_DELETE = 'SEARCH_DELETE';


export function loadCollections({ movies, music, books }) {
  return {
    type: COLLECTIONS_LOAD,
    payload: {
      movies,
      music,
      books
    }
  };
}

function collectionFailure(message) {
  return {
    type: COLLECTION_FAILURE,
    payload: {
      errorMessage: message
    }
  };
}

function searchSuccess(results) {
  return {
    type: SEARCH_SUCCESS,
    payload: {
      search: results
    }
  };
}

export function deleteSearch() {
  return {
    type: SEARCH_DELETE
  };
}

export function addItem(collection, item) {
  return {
    type: COLLECTION_ADD,
    payload: {
      item,
      collection
    }
  };
}

function removeItem(collection, id) {
  return {
    type: COLLECTION_REMOVE,
    payload: {
      id,
      collection
    }
  };
}

export function searchCollection(collection, value) {
  return (dispatch) => {
    fetch(`/api/${collection}/search/${encodeURI(value)}`, { method: 'GET' })
    .then(res => res.json()).then((body) => {
      if (ERROR_MESSAGES.indexOf(body.type) !== -1) {
        return dispatch(collectionFailure(body.message));
      }

      dispatch(searchSuccess(body.results));
    }).catch((err) => {
      dispatch(collectionFailure(err.message));
    });
  };
}

export function selectItem(collection, item) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ collection, item })
  };

  return (dispatch) => {
    dispatch(deleteSearch());

    fetch('/api/user/collection', config)
    .then(res => res.json()).then((body) => {
      if (ERROR_MESSAGES.indexOf(body.type) !== -1) {
        return dispatch(collectionFailure(body.message));
      }

      dispatch(addItem(collection, body.item));
    }).catch((err) => {
      dispatch(collectionFailure(err.message));
    });
  };
}

export function deleteItem(collection, id) {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ collection, id })
  };

  return (dispatch) => {
    fetch('/api/user/collection', config)
    .then(res => res.json()).then((body) => {
      if (ERROR_MESSAGES.indexOf(body.type) !== -1) {
        return dispatch(collectionFailure(body.message));
      }

      dispatch(removeItem(collection, id));
    }).catch((err) => {
      dispatch(collectionFailure(err.message));
    });
  };
}


export default function reducer(state = {
  movies: [],
  music: [],
  books: [],
  search: []
}, action) {
  switch (action.type) {
  case COLLECTIONS_LOAD:
    return Object.assign({}, state, {
      ...action.payload
    });
  case COLLECTION_ADD: {
    const { collection, item } = action.payload;

    return Object.assign({}, state, {
      [collection]: [].concat(...state[collection], item)
    });
  }
  case COLLECTION_REMOVE: {
    const { collection, id } = action.payload;

    const index = state[collection].findIndex(item => item.id === id);

    const newCollectionState = [].concat(...state[collection]);

    newCollectionState.splice(index, 1);

    return Object.assign({}, state, {
      [collection]: newCollectionState
    });
  }
  case COLLECTION_FAILURE:
    return Object.assign({}, state, {
      search: [],
      ...action.payload
    });
  case SEARCH_SUCCESS:
    return Object.assign({}, state, {
      ...action.payload
    });
  case SEARCH_DELETE:
    return Object.assign({}, state, {
      search: []
    });
  default:
    return state;
  }
}
