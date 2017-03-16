const path = require('path');

const Koa = require('koa'),
      helmet = require('koa-helmet'),
      bodyParser = require('koa-bodyparser'),
      compress = require('koa-compress'),
      render = require('koa-ejs'),
      logger = require('koa-logger'),
      serve = require('koa-static'),
      etag = require('koa-etag'),
      // jwt = require('koa-jwt'),
      cors = require('kcors'),
      errors = require('koa-errors'),
      passport = require('koa-passport'),
      router = require('koa-router')();

const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

// Mongoose Configuration
mongoose.Promise = global.Promise; // Use native promises

const app = new Koa();

const Routes = require('./server/routes'),
      models = require('./server/models');
      // secrets = require('./server/config/secrets'),
      // webpackConfig = require('./webpack.config'),
      // webpack = require('webpack'),
      // webpackHotMiddlware = require('./server/middleware/webpack-hot'),
      // webpackMiddleware = require('koa-webpack-dev-middleware');

// view
render(app, {
  root: path.join(__dirname, 'server/views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

// Mongoose Configuration
mongoose.connect('mongodb://localhost/athena');
mongoose.set('debug', false);

/* eslint no-console: 0 */
mongoose.connection.on('error', console.error.bind(console, 'mongo connection error:'));
mongoose.connection.on('connected', console.log.bind(console, 'mongo connection established!'));
mongoose.connection.on('connected', () => mongoose.connection.db.dropDatabase());

// middleware
// const compiler = webpack(webpackConfig);
//
// app.use(webpackMiddleware(compiler, {
//   // lazy: true,
//   //switch into lazy mode
//   // that means no watching, but recompilation on every request
//   // watchOptions: {
//   //   aggregateTimeout: 300,
//   //   poll: true
//   // },
//   stats: {
//     colors: true,
//     assets: false,
//     version: false,
//     hash: false,
//     timings: false,
//     chunks: false,
//     chunkModules: false
//   }
// }));
// app.use(webpackHotMiddlware(compiler));

app.use(cors());
app.use(logger());
app.use(helmet());
app.use(errors());
app.use(bodyParser());
app.use(async (ctx, next) => {
  // the parsed body will store in this.request.body
  ctx.body = ctx.request.body;
  await next();
});
app.use(compress());
app.use(etag());
app.use(serve(path.join(__dirname, 'public'), {
  maxage: 0,
  extensions: [ 'map' ]
}));
app.use(passport.initialize());

// router.use('/api', jwt({ secret: secrets.TOKEN_SECRET }));

router.post('/api/register', Routes.register);

// Routes
router.get('/*', Routes.index);

app.use(router.routes());

app.listen(port);
