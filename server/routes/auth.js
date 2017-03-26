const passport = require('koa-passport'),
      LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');

const { promisify } = require('../helpers');

const User = require('../models/user');

const strategyOpts = {
  usernameField: 'email'
};

passport.use('local-login', new LocalStrategy(strategyOpts, async (username, password, done) => {
  const email = username;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return done(null, null, {
        type: 'USER_NOT_FOUND',
        message: `User not found with the email: ${email}`
      });
    }

    const result = await user.comparePasswords(password);

    if (!result) {
      return done(null, null, {
        type: 'WRONG_PASSWORD',
        message: 'Wrong password'
      });
    }

    done(null, user);
  } catch (err) {
    err.origin = 'loginStrategy';

    done(err);
  }
}));

passport.use('local-register', new LocalStrategy(strategyOpts, async (username, password, done) => {
  const email = username;

  try {
    let user = await User.findOne({ email }).exec();

    if (user) {
      return done(null, null, {
        type: 'USER_EXISTS',
        message: `There is already a user registered with the email: ${email}`
      });
    }

    user = new User({
      email,
      password
    });

    user = await user.save();

    done(null, user);
  } catch (err) {
    err.origin = 'registerStrategy';

    done(err);
  }
}));


function authRoute(ctx, next) {
  const { TOKEN_SECRET } = ctx.secrets;
  
  return async (err, user, info) => {
    if (err) {
      err.origin = 'authRoute';
      ctx.error = err;

      await next();
    }

    if (user) {
      const { email, music, books, movies } = user.toObject();

      try {
        console.log(ctx.secrets);
        const token = await promisify(jwt.sign, { id: user.id }, TOKEN_SECRET, { expiresIn: '2 days' });

        ctx.body = JSON.stringify({ email, token, music, books, movies });
      } catch (error) {
        error.origin = 'authRoute';
        ctx.error = error;

        await next();
      }
    } else {
      ctx.status = 401;
      ctx.body = info;
    }
  };
}

module.exports.login = async (ctx, next) => (
  passport.authenticate('local-login', { session: false },
  authRoute(ctx, next))(ctx, next)
);

module.exports.register = async (ctx, next) => (
  passport.authenticate('local-register', { session: false },
  authRoute(ctx, next))(ctx, next)
);
