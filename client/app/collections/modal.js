import React, { PropTypes } from 'react';

import ModalImage from './modal-image';

const Modal = ({ results, title, image, onClose, onResultSelection }) => (
  <div className="modal is-active">
    <div className="modal-background" />
    <div className="modal-card" style={{ width: '800px' }}>
      <header className="modal-card-head">
        <p className="modal-card-title">Search results:</p>
        <button className="delete" onClick={onClose} />
      </header>
      <section className="modal-card-body">
        <div className="columns is-mobile">
          {results.map((result, index) => (
            <ModalImage
              key={`${result.title}${Math.random() * 1000}`}
              title={result[title]}
              image={result[image]}
              onClick={onResultSelection(index)}
            />
          ))}
        </div>
      </section>
    </div>
  </div>
);

Modal.propTypes = {
  results: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onResultSelection: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Modal;
