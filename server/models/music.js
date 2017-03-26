const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* eslint no-multi-assign: 0*/
/* eslint no-underscore-dangle: 0*/
const MusicSchema = Schema({
  artist: String,
  picture: String
}, {
  toObject: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Music', MusicSchema);
