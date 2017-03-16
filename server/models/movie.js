const mongoose = require('mongoose');

/* eslint no-multi-assign: 0*/
const MovieSchema = mongoose.Schema({
  title: String,
  year: Number,
  body: String,
  poster: String,
  actors: String,
  director: String,
  synopsis: String,
  origin: String
});

module.exports = mongoose.model('Movie', MovieSchema);
