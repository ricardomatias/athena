const auth = require('./auth'),
      user = require('./user');

async function index(ctx) {
  await ctx.render('index');
}

module.exports = {
  index,
  user,
  register: auth.register,
  login: auth.login
};
