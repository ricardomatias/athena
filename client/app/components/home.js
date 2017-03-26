import React from 'react';

import { Link } from '../router';

const Home = () => (
  <div className="home columns is-gapless is-mobile">
    <div
      className="column home-image is-one-third"
      style={{ backgroundImage: 'url(\'/assets/inception.jpeg\')' }}
    >
      <Link href={'/movies'}>
        <div className="image-overlay">&nbsp;</div>
        <h1 className="overlay-title title is-2">Movies</h1>
      </Link>
    </div>
    <div
      className="column home-image is-one-third"
      style={{ backgroundImage: 'url(\'/assets/radiohead.jpg\')' }}
    >
      <Link href={'/music'}>
        <div className="image-overlay">&nbsp;</div>
        <h1 className="overlay-title title is-2">Music</h1>
      </Link>
    </div>
    <div
      className="column home-image is-one-third"
      style={{ backgroundImage: 'url(\'/assets/brave.gif\')' }}
    >
      <Link href={'/books'}>
        <div className="image-overlay">&nbsp;</div>
        <h1 className="overlay-title title is-2">Books</h1>
      </Link>
    </div>
  </div>
);

export { Home };
