const path = require('path'),
      fs = require('fs');

const Koa = require('koa'),
      helmet = require('koa-helmet'),
      bodyParser = require('koa-bodyparser'),
      compress = require('koa-compress'),
      render = require('koa-ejs'),
      logger = require('koa-logger'),
      serve = require('koa-static'),
      etag = require('koa-etag'),
      jwt = require('koa-jwt'),
      cors = require('kcors'),
      errors = require('koa-errors'),
      passport = require('koa-passport'),
      router = require('koa-router')();

const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const dbhost = process.env.NODE_ENV === 'production' ? 'mongo' : 'localhost';

// Mongoose Configuration
mongoose.Promise = global.Promise; // Use native promises

const app = new Koa();

const Routes = require('./server/routes'),
      { errorHandling } = require('./server/middleware');

const secrets = fs.readFileSync(path.join(__dirname, '.secrets'), 'utf8');

const secretsKeys = [ 'TOKEN_SECRET', 'MOVIES_KEY', 'MUSIC_KEY', 'BOOKS_KEY' ];

const parsedSecrets = secretsKeys.reduce((obj, key) => {
  obj[key] = secrets.match(`${key}=(.*)`)[0].replace(`${key}=`, '');

  return obj;
}, {});

// view
render(app, {
  root: path.join(__dirname, 'server/views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

// Mongoose Configuration
mongoose.connect(`mongodb://${dbhost}/athena`);
mongoose.set('debug', false);

/* eslint no-console: 0 */
mongoose.connection.on('error', console.error.bind(console, 'mongo connection error:'));
mongoose.connection.on('connected', console.log.bind(console, 'mongo connection established!'));

app.use(cors());
app.use(logger());
app.use(helmet());
app.use(errors());
app.use(bodyParser());
app.use(async (ctx, next) => {
  // the parsed body will store in this.request.body
  ctx.body = ctx.request.body;

  // pass secrets
  ctx.secrets = parsedSecrets;

  await next();
});
app.use(compress());
app.use(etag());
app.use(serve(path.join(__dirname, 'public'), {
  maxage: 0,
  extensions: [ 'map' ]
}));
app.use(errorHandling());

// Session Configuration
app.use(passport.initialize());

router.use('/api', jwt({ secret: parsedSecrets.TOKEN_SECRET }).unless({ path: [ /^\/api\/(login|register)/ ] }));

// AUTH
router.post('/api/login', Routes.login);
router.post('/api/register', Routes.register);

router.use('/api/user', Routes.user);

// COLLECTIONS
router.use('/api/movies', Routes.movies);
router.use('/api/music', Routes.music);
router.use('/api/books', Routes.books);

// Routes
router.get('/*', Routes.index);

router.get('*', async (ctx) => {
  // the parsed body will store in this.request.body
  ctx.status = 404;

  ctx.body = {
    type: 'PAGE_NOT_FOUND',
    message: 'Nothing to see here.'
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);
