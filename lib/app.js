'use strict';

require('dotenv').load();

var logger = require('./logger');
var isProduction = process.env.NODE_ENV === 'production';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');
var utils = require('./utils');
var responseTime = require('response-time');
var urlset = require('urlset');
var config = require('./config');
var path = require('path');
var sessions = require('client-sessions');
var passport = require('./passport');

function catchError(req, res, error) {
	logger.error(error.message || 'errorHandler', {
		hostname: req.hostname,
		url: req.originalUrl,
		stack: error.stack
	});

	utils.maxage(res, 0);

	res.status(error.code || error.statusCode || 500).send('Error!');
}

function createApp() {
	var app = express();

	app.disable('x-powered-by');
	app.set('view engine', 'jade');
	app.set('views', path.join(__dirname, 'views'));
	app.disable('etag');

	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));
	app.use(methodOverride());
	app.use(responseTime());
	if (!isProduction) {
		app.use(require('morgan')('dev'));
	}

	urlset.load(path.join(__dirname, 'sitemap.json'));
	urlset.setParam({
		name: 'ul',
		value: config.language,
		format: 's'
	});
	app.locals.links = urlset.url;

	app.use(express.static(path.join(__dirname, 'public'), {
		maxAge: isProduction ? (1000 * 60 * 15) : 0
	}));

	app.use(sessions({
    cookieName: config.sessions.cookieName,
    requestKey: 'session', // requestKey overrides cookieName for the key name added to the request object.
    secret: config.sessions.secret, // should be a large unguessable string or Buffer
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  }));

  // passport
  app.use(passport.initialize());
  app.use(passport.session());

	routes(app);

	app.all('*', function(req, res) {
		// res.status(404).end();
		// core.logger.error('Error 404', {
		//   hostname: req.hostname,
		//   url: req.originalUrl
		// });
		res.redirect('/');
	});

	app.use(function(error, req, res) {
		catchError(req, res, error);
	});

	app.on('uncaughtException', function(req, res, route, error) {
		catchError(req, res, error);
	});

	logger.warn('Starting app on port ' + process.env.PORT + '...', {
		maintenance: 'start'
	});

	app.listen(process.env.PORT);
}

createApp();

process.on('uncaughtException', function(err) {
	logger.error('uncaughtException: ' + err.message, {
		trace: err.trace
	});
});
