var _package = require('../../package.json');
var config = require('../config');
var core = require('ournet.core');
var Data = require('ournet.data');
var utils = require('../utils.js');
var util = {
	moment: require('moment'),
	format: require('util').format,
	startWithUpperCase: core.util.startWithUpperCase,
	numberFormat: core.util.numberFormat,
	wrapAt: core.text.wrapAt
};

module.exports = function(req, res, next) {
	var culture = res.locals.currentCulture = {
		language: res.locale,
		country: config.country
	};
	var __ = res.locals.__;
	var links = res.app.locals.links;
	culture.languageName = __('language_' + culture.language);

	res.locals.site = {
		name: config.name,
		head: {}
	};

	res.locals.config = config;

	res.locals.project = {
		version: _package.version,
	};

	//res.locals.noGoogleAds = true;

	res.locals.util = util;

	utils.maxage(res, 60 * 1);

	res.locals.location = [{
		url: links.home(culture.language),
		text: __('home')
	}];

	Data.widgets.getWeatherWidget({
		country: culture.country,
		lang: culture.language,
		host: 'meteo.click.md',
		id: core.constants.portal.weather.capitals[config.country]
	}).then(function(widget) {
		res.locals.weatherWidget = widget;
	}).finally(next);
};
