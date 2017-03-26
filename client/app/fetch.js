import isoFetch from 'isomorphic-fetch';

import token from './authentication/token';

export default function fetch(endpoint, config) {
  if (!config) {
    throw new Error('must provide an object with the request method');
  }

  if (token.exists()) {
    config.headers = Object.assign({}, config.headers, { Authorization: `Bearer ${token.get()}` });
  }

  return isoFetch(endpoint, config);
}
