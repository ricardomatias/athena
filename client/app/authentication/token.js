const { TOKEN_LOCATION } = require('../config/constants');

function set(token) {
  localStorage.setItem(TOKEN_LOCATION, token);
}

function exists() {
  return localStorage.getItem(TOKEN_LOCATION) !== null;
}

function remove() {
  localStorage.removeItem(TOKEN_LOCATION);
}

function get() {
  return localStorage.getItem(TOKEN_LOCATION);
}

function decode() {
  const token = get();

  if (token && token.split('.').length === 3) {
    try {
      const base64Url = token.split('.')[1];

      const base64 = base64Url.replace('-', '+').replace('_', '/');

      return JSON.parse(atob(base64));
    } catch (e) {
      // no-op
    }
  }

  return {};
}

export default {
  set,
  exists,
  remove,
  get,
  decode
};
