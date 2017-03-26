import React, { PropTypes } from 'react';

const Card = props => (
  <div className="column is-1-desktop is-one-tablet is-one-quarter-mobile">
    <div className="card">
      <div className="card-image">
        <div className="card-overlay" />
        <p className="card-subtitle">{props.title}</p>
        <button className="card-button delete" onClick={props.onDelete} />
        <figure className={`image ${props.imageClass}`}>
          <img src={props.image} alt="Movie poster" />
        </figure>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const CollectionCards = ({ collection, image, imageClass, title, onDelete }) => (
  <div className="column">
    <div className="columns is-multiline is-gapless is-mobile">
      {
        collection.map(coll => (
          <Card
            key={coll.id}
            image={coll[image]}
            title={coll[title]}
            imageClass={imageClass}
            onDelete={onDelete(coll.id)}
          />
        ))
      }
    </div>
  </div>
);

CollectionCards.propTypes = {
  collection: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};


export default CollectionCards;
