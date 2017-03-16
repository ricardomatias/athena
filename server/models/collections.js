const mongoose = require('mongoose');

const Movie = require('./movie'),
      Music = require('./music'),
      Book = require('./book');

const Schema = mongoose.Schema;

/* eslint no-multi-assign: 0*/
const CollectionsSchema = Schema({
  movies: [ Movie.schema ],
  music: [ Music.schema ],
  books: [ Book.schema ]
});

// add upvotes count method

module.exports = mongoose.model('Collections', CollectionsSchema);
