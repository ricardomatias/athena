const path = require('path');

const Koa = require('koa'),
      helmet = require('koa-helmet'),
      bodyParser = require('koa-bodyparser'),
      compress = require('koa-compress'),
      render = require('koa-ejs'),
      logger = require('koa-logger'),
      serve = require('koa-static'),
      etag = require('koa-etag'),
      router = require('koa-router')();

const mongoose = require('mongoose');

const app = new Koa();

const Routes = require('./server/routes');

const models = require('./server/models');

// view
render(app, {
  root: path.join(__dirname, 'server/views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

function log(...args) {
  console.log(args.join(''), '\n');
}

// Mongoose Configuration
mongoose.connect('mongodb://localhost/athena');
mongoose.set('debug', false);

/* eslint no-console: 0 */
mongoose.connection.on('error', console.error.bind(console, 'mongo connection error:'));
mongoose.connection.on('connected', console.log.bind(console, 'mongo connection established!'));
mongoose.connection.on('connected', () => {
  const user = new models.User({
    email: 'user@gmail.com',
    password: 123245,
    username: 'user'
  });

  const argument = new models.Argument({
    date: new Date(),
    body: 'Yes. Because we envy women.',
    from: user,
    upvotes: [ user.id ]
  });

  const debate = new models.Debate({
    name: 'foobar',
    participants: [ user.id ],
    upvotes: [ user.id ],
    arguments: [ argument ]
  });

  const motion = new models.Motion({
    date: new Date(),
    body: 'Is the Bible against women\'s rights?',
    upvotes: [ user.id ],
    debates: [ debate ]
  });

  debate.motion = motion;

  user.participated.addToSet(debate);
});

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

// Routes
router.get('/', Routes.index);

app.use(router.routes());

app.listen(3000);
