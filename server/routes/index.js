const auth = require('./auth'),
      user = require('./user'),
      movies = require('./movies'),
      music = require('./music'),
      books = require('./books');

async function index(ctx) {
  await ctx.render('index');
}

module.exports = {
  index,
  user,
  movies,
  music,
  books,
  register: auth.register,
  login: auth.login
};
