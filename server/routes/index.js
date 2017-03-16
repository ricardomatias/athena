const register = require('./register');

async function index(ctx) {
  await ctx.render('index');
}

module.exports = {
  index,
  register
};
