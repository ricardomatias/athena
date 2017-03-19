const User = require('../models/user');

const { promisify } = require('../helpers');

const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = require('../config/secrets');

module.exports = async (ctx, next) => {
  const { id } = ctx.params;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      ctx.status = 401;
      ctx.body = {
        type: 'USER_NOT_FOUND',
        message: 'User not found'
      };

      await next();
    }

    const { email, collections } = user;

    const token = await promisify(jwt.sign, { id: user.id }, TOKEN_SECRET, { expiresIn: '2 days' });

    ctx.body = JSON.stringify({ email, token, collections });
  } catch (error) {
    error.origin = 'userRoute';
    ctx.error = error;

    await next();
  }
};
