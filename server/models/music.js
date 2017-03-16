const mongoose = require('mongoose');

const Discography = require('./discography');

const Schema = mongoose.Schema;

/* eslint no-multi-assign: 0*/
const MusicSchema = Schema({
  artist: String,
  bio: String,
  discography: [ Discography.schema ]
});

module.exports = mongoose.model('Music', MusicSchema);
