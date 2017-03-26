const mongoose = require('mongoose'),
      fs = require('fs'),
      path = require('path'),
      bcrypt = require('bcryptjs');

const promisify = require('../helpers').promisify;

const Movie = require('./movie'),
      Music = require('./music'),
      Book = require('./book');

const Schema = mongoose.Schema;

const mocks = JSON.parse(fs.readFileSync(path.join(__dirname, '/mocks.json'), 'utf8'));


/* eslint no-multi-assign: 0 */
const UserSchema = Schema({
  email: {
    type: String,
    required: 'An email is required.',
    unique: true
  },
  password: String,
  username: String,
  movies: [ Movie.schema ],
  music: [ Music.schema ],
  books: [ Book.schema ]
});

UserSchema.methods.clean = function clean() {
  const user = this.toObject();

  /* eslint no-underscore-dangle: 0 */
  delete user.password;
  delete user._id;
  delete user.__v;

  return user;
};

UserSchema.methods.comparePasswords = async function comparePasswords(password) {
  const answer = await promisify(bcrypt.compare, password, this.password);

  return answer;
};

UserSchema.methods.addMocks = function addMocks() {
  try {
    mocks.movies.forEach((movie) => {
      this.movies.addToSet(new Movie(movie));
    });

    mocks.music.forEach((music) => {
      this.music.addToSet(new Music(music));
    });

    mocks.books.forEach((book) => {
      this.books.addToSet(new Book(book));
    });
  } catch (err) {
    err.origin = 'addMocks';

    throw new Error(err);
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

    this.addMocks();

    next();
  } catch (err) {
    console.error(err);

    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
