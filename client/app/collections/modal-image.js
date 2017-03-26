import React from 'react';

/* eslint "jsx-a11y/no-static-element-interactions": 0 */
const ModalImage = props => (
  <div className="column modal-image is-one-third">
    <a target="_blank" rel="noopener noreferrer" onClick={props.onClick}>
      <p className="image">
        <img src={props.image} alt={props.title} />
      </p>
    </a>
    <p className="modal-subtitle subtitle has-text-centered is-6">
      {props.title}
    </p>
  </div>
);

ModalImage.propTypes = {
  image: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default ModalImage;
