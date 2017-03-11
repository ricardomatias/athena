const mongoose = require('mongoose');

const Argument = require('./argument');

const Schema = mongoose.Schema;

/* eslint no-multi-assign: 0*/
const DebateSchema = Schema({
  name: String,
  motion: { type: Schema.Types.ObjectId, ref: 'Motion' },
  participants: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  upvotes: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  arguments: [ Argument.schema ]
});

module.exports = mongoose.model('Debate', DebateSchema);
