const mongoose = require('mongoose');

/* eslint no-multi-assign: 0*/
/* eslint no-underscore-dangle: 0*/
const MovieSchema = mongoose.Schema({
  title: String,
  poster: String
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

module.exports = mongoose.model('Movie', MovieSchema);
