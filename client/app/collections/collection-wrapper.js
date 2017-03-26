import React, { Component, PropTypes } from 'react';

import { bind } from '../helpers';

import { history } from '../router';

import Input from './input';
import Modal from './modal';

const placeholders = {
  movies: 'Add a movie',
  music: 'Add an artist',
  books: 'Add a book'
};


class CollectionWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      select: props.name,
      placeholder: placeholders[props.name],
      value: ''
    };
  }

  handleSelect(event) {
    const value = event.target.value;

    if (this.state.value !== value) {
      history.push(`/${value}`);
    }

    this.setState({ select: value, placeholder: placeholders[value] });
  }

  handleInput(event) {
    const value = event.target.value;

    this.setState({ value });
  }

  handleSubmit() {
    const { searchCollection } = this.props,
          { select, value } = this.state;

    if (value) {
      searchCollection(select, value);
    }
  }

  render() {
    const { results, closeModal, selectResult, title, image } = this.props;

    return (
      <div>
        { results.length ?
          <Modal
            results={results}
            onClose={closeModal}
            onResultSelection={selectResult}
            title={title}
            image={image}
          /> : ''}
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <div className="input-search column is-half is-offset-one-quarter">
                <Input
                  placeholder={this.state.placeholder}
                  value={this.state.value}
                  select={this.state.select}
                  onSelect={bind(this.handleSelect, this)}
                  onInput={bind(this.handleInput, this)}
                  onSubmit={bind(this.handleSubmit, this)}
                />
              </div>
            </div>
          </div>
        </section>
        <div className="columns">
          { this.props.children }
        </div>
      </div>
    );
  }
}

CollectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  searchCollection: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectResult: PropTypes.func.isRequired
};

export default CollectionWrapper;
