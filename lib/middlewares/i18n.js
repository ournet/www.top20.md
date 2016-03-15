'use strict';

var i18n = require('i18n');
var config = require('../config');
var path = require('path');

i18n.configure({
	// setup some locales - other locales default to en silently
	locales: config.languages,

	// where to store json files - defaults to './locales' relative to modules directory
	directory: path.join(__dirname, '../locales'),

	defaultLocale: config.language
});

module.exports = function(req, res, next) {
	var locale;
	if (/^\/ru\//.test(req.path) || req.query.ul === 'ru') {
		locale = 'ru';
	} else {
		locale = config.languages[0];
	}
	res.locals.locale = res.locale = locale;
	i18n.init(req, res);
	res.setLocale(locale);

	return next();
};
