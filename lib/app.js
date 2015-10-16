require('dotenv').load();

var core = require('ournet.core');

core.Logger.init({
  tags: ['top20'],
  json: true
});

if (process.env.MODE !== 'dev') {
  core.logger.warn('Starting app...', {
    maintenance: 'start'
  });
}

var
  express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Promise = core.Promise,
  routes = require('./routes'),
  middlewares = require('./middlewares'),
  utils = require('./utils'),
  responseTime = require('response-time'),
  urlset = require('urlset'),
  config = require('./config'),
  //compress = require('compression')(),
  app,
  startDate = Date.now();

function createApp() {
  if (app) return;
  app = express();

  app.disable('x-powered-by');
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.disable('etag');

  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
  }));
  app.use(methodOverride());
  app.use(responseTime());
  if (process.env.MODE === 'dev') {
    app.use(require('morgan')('dev'));
  }

  urlset.load(__dirname + '/sitemap.json');
  urlset.setParam({
    name: 'ul',
    value: config.language
  });
  app.locals.links = urlset.url;

  app.use(express.static(__dirname + '/public', {
    maxAge: process.env.MODE === 'dev' ? 0 : (1000 * 60 * 15)
  }));

  app.use('/int', require('./middlewares/int'));
  // app.use('/int', require('./routes/int'));

  app.use(require('./routes/redirect'));
  middlewares(app);
  routes(app);

  app.all('*', function(req, res) {
    res.status(404).end();
    core.logger.error('Error 404', {
      hostname: req.hostname,
      url: req.originalUrl
    });
  });

  app.use(function(error, req, res, next) {
    catchError(req, res, error);
  });

  app.on('uncaughtException', function(req, res, route, error) {
    catchError(req, res, error);
  });

  app.listen(process.env.PORT || 6060);
}

function catchError(req, res, error) {
  core.logger.error(error.message || 'errorHandler', {
    hostname: req.hostname,
    url: req.originalUrl,
    stack: error.stack
  });

  utils.maxage(res, 0);

  res.status(error.code || error.statusCode || 500).send('Error!');
}

createApp();

process.on('uncaughtException', function(err) {
  core.logger.error('uncaughtException: ' + err.message, {
    trace: err.trace
  });
});


function testProcess() {
  var memory = parseInt(process.memoryUsage().rss / 1048576);
  var time = (Date.now() - startDate) / 1000 / 60;
  time = parseInt(time);
  var MEMORY = parseInt(process.env.MEMORY_LIMIT || 250);
  if (memory > MEMORY) {
    core.logger.error('Memory overload', {
      memory: memory,
      runtime: time,
      maintenance: 'stop'
    });
    setTimeout(function() {
      return process.kill(process.pid);
    }, 1000 * 10);
    return;
  }
}

setInterval(testProcess, 1000 * 60 * 5);
