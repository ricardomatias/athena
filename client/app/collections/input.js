import React, { PropTypes } from 'react';

const Input = props => (
  <div className="field has-addons has-addons-centered">
    <p className="control">
      <span className="select">
        <select value={props.select} onChange={props.onSelect}>
          <option value="movies">Movies</option>
          <option value="music">Music</option>
          <option value="books">Books</option>
        </select>
      </span>
    </p>
    <p className="control is-expanded">
      <input className="input" type="text" placeholder={props.placeholder} value={props.value} onChange={props.onInput} onKeyUp={(evt) => { if (evt.keyCode === 13) props.onSubmit(); }} />
    </p>
    <p className="control">
      <button type="submit" className="button is-info" onClick={props.onSubmit}>
        Search
      </button>
    </p>
  </div>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  select: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Input;
