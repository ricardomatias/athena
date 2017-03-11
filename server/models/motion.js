const mongoose = require('mongoose');

const Debate = require('./debate');

const Schema = mongoose.Schema;

/* eslint no-multi-assign: 0*/
const MotionSchema = Schema({
  date: Date,
  body: String,
  upvotes: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  debates: [ Debate.schema ]
});

// add upvotes count method

module.exports = mongoose.model('Motion', MotionSchema);
