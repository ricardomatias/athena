const passport = require('koa-passport'),
      LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = require('../config/secrets');

const { promisify } = require('../helpers');

const User = require('../models/user');

const strategyOpts = {
  usernameField: 'email'
};

passport.use('local-register', new LocalStrategy(strategyOpts, async (username, password, done) => {
  const email = username;

  try {
    let user = await User.findOne({ email }).exec();

    if (!user) {
      user = new User({
        email,
        password
      });

      user = await user.save();
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
}));

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(async (id, done) => {
  try {
    const user = User.findById(id).exec();

    done(null, user);
  } catch (err) {
    done(err);
  }
});


module.exports = async (ctx, next) => (
  passport.authenticate('local-register', { session: false },
  async function registerRoute(err, user) {
    if (user === false) {
      ctx.throw(401);
    } else {
      const token = await promisify(jwt.sign, user, TOKEN_SECRET, { expiresIn: '1h' });

      const { email, participated } = user;

      ctx.type = 'json';
      ctx.body = JSON.stringify({ email, participated, token });
    }
  })(ctx, next)
);
