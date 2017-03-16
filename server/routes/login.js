
const passport = require('koa-passport'),
      LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy((username, password, done) => {
//   // fetchUser()
//   //   .then(user => {
//   //     if (username === user.username && password === user.password) {
//   //       done(null, user)
//   //     } else {
//   //       done(null, false)
//   //     }
//   //   })
//   //   .catch(err => done(err))
// }));

async function login(ctx, next) {
  await next();
}

module.exports = login;
