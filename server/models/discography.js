const mongoose = require('mongoose');

/* eslint no-multi-assign: 0*/
const DiscographySchema = mongoose.Schema({
  title: String,
  type: String,
  songs: [ String ],
  year: Number
});

module.exports = mongoose.model('Discography', DiscographySchema);
