const mongoose = require('mongoose');

/* eslint no-multi-assign: 0*/
const ArgumentSchema = mongoose.Schema({
  date: Date,
  body: String,
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  upvotes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ]
});

module.exports = mongoose.model('Argument', ArgumentSchema);
