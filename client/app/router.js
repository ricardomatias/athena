import React, { PropTypes } from 'react';

/* eslint no-underscore-dangle: 0 */
const _onChangeListeners = [];

export const history = {
  push: (pathname) => {
    window.history.pushState({}, '', pathname);

    _onChangeListeners.forEach(callback => callback(pathname));
  },
  onChange: cb => _onChangeListeners.push(cb)
};

export const Link = (props) => {
  const onClick = (evt) => {
    const aNewTab = evt.metaKey || evt.ctrlKey;
    const anExternalLink = props.href.startsWith('http');

    if (!aNewTab && !anExternalLink) {
      evt.preventDefault();

      history.push(props.href);
    }
  };

  return (
    <a href={props.href} onClick={onClick} className={props.classes}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  classes: PropTypes.string,
  children: PropTypes.node
};
