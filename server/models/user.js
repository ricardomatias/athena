const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* eslint no-multi-assign: 0*/
const UserSchema = Schema({
  email: {
    type: String,
    required: 'An email is required.',
    unique: true
  },
  password: String,
  username: String,
  participated: [ { type: Schema.Types.ObjectId, ref: 'Debate' } ]
});

module.exports = mongoose.model('User', UserSchema);
