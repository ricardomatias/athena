const router = require('koa-router')();

const User = require('../models/user');

const { promisify } = require('../helpers');

const jwt = require('jsonwebtoken');

async function parseUser(ctx, next) {
  const { authorization } = ctx.headers;

  try {
    const token = await promisify(jwt.verify, authorization.split(' ')[1], ctx.secrets.TOKEN_SECRET);

    const user = await User.findById(token.id).exec();

    if (!user) {
      ctx.status = 401;
      ctx.body = {
        type: 'USER_NOT_FOUND',
        message: 'User not found'
      };

      return;
    }

    ctx.user = user;

    await next();
  } catch (error) {
    error.origin = 'parseUser';

    ctx.error = error;
  }
}

async function getUser(ctx, next) {
  const { id } = ctx.params;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      ctx.error = {
        type: 'USER_NOT_FOUND',
        message: 'User not found'
      };

      await next();

      return;
    }

    const { email, music, books, movies } = user.toObject();

    const token = await promisify(jwt.sign, { id: user.id }, ctx.secrets.TOKEN_SECRET, { expiresIn: '2 days' });

    ctx.body = JSON.stringify({ email, token, music, books, movies });
  } catch (error) {
    error.origin = 'getUser';

    ctx.error = error;
  }
}

router.get('/:id', getUser);


async function addItem(ctx) {
  const { collection, item } = ctx.body,
        user = ctx.user;

  try {
    await user[collection].addToSet(item);

    await user.save();

    const newItem = user[collection].toObject().pop();

    ctx.status = 200;
    ctx.body = JSON.stringify({ item: newItem });
  } catch (error) {
    error.origin = 'addItem';

    ctx.error = error;
  }
}

router.post('/collection', parseUser, addItem);


async function deleteItem(ctx, next) {
  const { collection, id } = ctx.body,
        user = ctx.user;

  try {
    const index = await user[collection].id(id);

    if (index === -1) {
      ctx.error = {
        type: 'ITEM_NOT_FOUND',
        message: 'Item not found'
      };

      await next();

      return;
    }

    user[collection].pull({ _id: id });

    await user.save();

    ctx.status = 200;
  } catch (error) {
    error.origin = 'deleteItem';

    ctx.error = error;
  }
}

router.delete('/collection', parseUser, deleteItem);

module.exports = router.routes();
