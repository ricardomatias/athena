import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './app';

const store = createStore(() => {});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => { render(App); });
}
