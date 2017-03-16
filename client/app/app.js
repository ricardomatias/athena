import React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { Login, Register } from './authentication';
import { Home, Navigation } from './components';

const App = () => (
  <Router>
    <section className="section">
      <div className="container">
        <Navigation />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </div>
    </section>
  </Router>
);

export default App;
