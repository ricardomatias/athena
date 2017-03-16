const mongoose = require('mongoose');

/* eslint no-multi-assign: 0*/
const BookSchema = mongoose.Schema({
  author: String,
  title: String,
  year: Number,
  synopsis: String
});

module.exports = mongoose.model('Book', BookSchema);
