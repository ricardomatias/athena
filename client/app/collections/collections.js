import React, { Component } from 'react';
import { connect } from 'react-redux';

import CollectionCards from './collection-cards';
import CollectionWrapper from './collection-wrapper';

import { searchCollection, deleteSearch, selectItem, deleteItem } from './state';

import { bind } from '../helpers';

const COLL_OPTIONS = {
  movies: {
    title: 'title',
    image: 'poster',
    imageClass: 'is-1by2'
  },
  music: {
    title: 'artist',
    image: 'picture',
    imageClass: 'is-square'
  },
  books: {
    title: 'title',
    image: 'cover',
    imageClass: 'is-1by2'
  }
};


const Collections = (name) => {
  const { title, image, imageClass } = COLL_OPTIONS[name];

  const mapStateToProps = (state) => {
    const collection = state.collections[name],
          search = state.collections.search;

    return {
      collection,
      results: search
    };
  };

  class Collection extends Component {

    searchCollection(type, value) {
      const { dispatch } = this.props;

      dispatch(searchCollection(type, value));
    }

    closeModal() {
      const { dispatch } = this.props;

      dispatch(deleteSearch());
    }

    selectResult(index) {
      const { dispatch, results } = this.props;

      return () => {
        dispatch(selectItem(name, results[index]));
      };
    }

    deleteItem(id) {
      const { dispatch } = this.props;

      return () => {
        dispatch(deleteItem(name, id));
      };
    }

    render() {
      const { collection, results } = this.props;

      return (
        <CollectionWrapper
          name={name}
          results={results}
          searchCollection={bind(this.searchCollection, this)}
          closeModal={bind(this.closeModal, this)}
          selectResult={bind(this.selectResult, this)}
          title={title}
          image={image}
        >
          <CollectionCards
            collection={collection}
            title={title}
            image={image}
            imageClass={imageClass}
            onDelete={bind(this.deleteItem, this)}
          />
        </CollectionWrapper>
      );
    }
  }

  Collection.propTypes = {
    collection: React.PropTypes.array.isRequired,
    results: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  return connect(mapStateToProps)(Collection);
};

export default Collections;
