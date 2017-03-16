const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');

const promisify = require('../helpers').promisify;

const Schema = mongoose.Schema;

/* eslint no-multi-assign: 0 */
const UserSchema = Schema({
  email: {
    type: String,
    required: 'An email is required.',
    unique: true
  },
  password: String,
  username: String,
  movies: [ { type: Schema.Types.ObjectId, ref: 'Movie' } ],
  music: [ { type: Schema.Types.ObjectId, ref: 'Music' } ],
  books: [ { type: Schema.Types.ObjectId, ref: 'Books' } ]
});

UserSchema.methods.clean = function clean() {
  const user = this.toObject();

  /* eslint no-underscore-dangle: 0 */
  delete user.password;
  delete user._id;

  return user;
};

UserSchema.methods.comparePasswords = function comparePasswords(password, next) {
  try {
    promisify(bcrypt.compare, password, this.password);

    next();
  } catch (err) {
    console.error(err);

    next(err);
  }
};

UserSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await promisify(bcrypt.genSalt, 10);

    const hash = await promisify(bcrypt.hash, this.password, salt);

    this.password = hash;

    next();
  } catch (err) {
    console.error(err);

    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
