const path = require('path');

const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const render = require('koa-ejs');
const logger = require('koa-logger');
const router = require('koa-router')();
const serve = require('koa-static');
const etag = require('koa-etag');

const mongoose = require('mongoose');

const app = new Koa();

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

// middleware
app.use(logger());
app.use(helmet());
app.use(bodyParser());
app.use(compress());
app.use(etag());
app.use(serve(path.join(__dirname, 'public'), {
  maxage: 0,
  extensions: [ 'map' ]
}));

router.get('/', async function getIndexPage(ctx) {
  await ctx.render('index');
});

app.use(router.routes());

app.listen(3000);
