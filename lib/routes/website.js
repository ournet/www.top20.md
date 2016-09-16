'use strict';

var express = require('express');
var utils = require('../utils');
var _ = utils._;
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var Data = require('../data');
var Catalog = require('../data/catalog');
// var config = require('../config');
var Promise = utils.Promise;
var url = require('url');
var hostExplore = require('../host_explore');
var helpers = require('../helpers');
var logger = require('../logger');
var recaptcha = require('../recaptcha');

var mustLogin = require('../middlewares/login');

// POST add website
route.post('/:ul(ru)?/website/add', function(req, res, next) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var __ = res.__;

	utils.maxageWebsite(res);
	res.locals.noGoogleAds = true;

	res.locals.site.head.title = res.locals.title = __('add_website');

	var website = res.locals.website = { url: (req.body.url || '').trim().toLowerCase() };
	if (!/^http(s)?:/.test(website.url)) {
		website.url = 'http://' + website.url;
	}
	website.url = url.parse(website.url);
	website.host = website.url.host;

	return Data.access.website({
		host: website.host.replace(/^www\./, '') || '.'
	}).then(function(dbWebsite) {
		if (dbWebsite) {
			return res.redirect(links.website(dbWebsite.host, { ul: currentCulture.language }));
		}

		var props = {
			catalog: Catalog.fill(false),
			liveWebsite: hostExplore(website.url.host)
				.catch(function(error) {
					res.locals.message = __(error.message);
				})
		};

		return Promise.props(props)
			.then(function(result) {
				res.locals.catalog = result.catalog;
				if (result.liveWebsite) {
					website = result.liveWebsite;
					return Data.control.createWebsite(website)
						.then(function(newWebsite) {
							logger.warn('Created website: ' + newWebsite.host, newWebsite);
							return res.redirect(links.website.edit(website.host, { ul: currentCulture.language }));
						});

				} else {
					return res.render('add');
				}
			});

	}, next);
});

// GET add website
route.get('/:ul(ru)?/website/add', function(req, res, next) {
	utils.maxageWebsite(res);
	res.locals.noGoogleAds = true;
	res.locals.site.head.title = res.locals.title = res.__('add_website');
	Catalog.fill(false)
		.then(function(catalog) {
			res.locals.catalog = catalog;
			res.render('add');
		}, next);
});

// POST edit website
route.post('/:ul(ru)?/website/edit/:id', function(req, res) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var __ = res.__;
	var id = req.params.id;

	res.locals.access_key = req.query.access_key || req.body.access_key;

	var filter = {};

	if (/^\d+$/.test(id)) {
		filter.id = parseInt(id);
	} else {
		filter.host = id;
	}

	utils.maxage(res, 0);
	res.locals.noGoogleAds = true;

	res.locals.site.head.title = res.locals.title = __('edit_site');

	Data.access.website(filter)
		.then(function(website) {
			if (!website) {
				return res.redirect(links.home({ ul: currentCulture.language }));
			}

			return recaptcha(req.body['g-recaptcha-response'], req.ip)
				.then(function(statusCode) {
					// console.log('statusCode', statusCode);

					var websiteData = _.pick(req.body, res.locals.userIsAdmin ? ['title', 'description', 'keywords', 'categories', 'contentType', 'country', 'lang', 'status'] : ['title', 'description', 'keywords', 'categories', 'contentType']);
					websiteData.id = website.id;

					// console.log(websiteData);

					return Data.control.updateWebsite(websiteData)
						.then(function() {
							res.redirect(links.website.info(website.host, { ul: currentCulture.language, edited: 1 }));
						});
				});

		}).catch(function(error) {
			logger.error('edit website error', error.message);
			res.redirect(links.website.edit(id, { ul: currentCulture.language, error: 1 }));
		});
});

// GET edit website
route.get('/:ul(ru)?/website/edit/:id', function(req, res, next) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var __ = res.__;
	var id = req.params.id;

	res.locals.access_key = req.query.access_key;

	var filter = {};

	if (/^\d+$/.test(id)) {
		filter.id = parseInt(id);
	} else {
		filter.host = id;
	}

	utils.maxageWebsite(res);
	res.locals.noGoogleAds = true;

	res.locals.site.head.title = res.locals.title = __('edit_site');

	return Data.access.website(filter)
		.then(function(website) {
			if (!website) {
				return res.redirect(links.home({ ul: currentCulture.language }));
			}

			var props = {
				catalog: Catalog.fill(false)
			};

			res.locals.contentTypes = Data.contentTypes.types();
			res.locals.Categories = Data.categories.categories();
			res.locals.SubCategories = Data.categories.subCategories();

			res.locals.categories = helpers.formatWebsiteCategories(website);

			return Promise.props(props)
				.then(function(result) {
					res.locals.catalog = result.catalog;
					res.locals.website = website;
					return res.render('edit');
				});

		}, next);
});
