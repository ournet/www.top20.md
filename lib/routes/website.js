'use strict';

var express = require('express');
var utils = require('../utils');
var _ = utils._;
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var Data = require('../data');
// var config = require('../config');
var Promise = utils.Promise;
var url = require('url');
var hostExplore = require('../host_explore');
var helpers = require('../helpers');
var logger = require('../logger');
var recaptcha = require('../recaptcha');

function preWebsite(req, res, next) {
	utils.maxage(res, 0);
	res.locals.noGoogleAds = true;
	next();
}

// POST add website
route.post('/:ul(ru)?/website/add', preWebsite, function(req, res, next) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var __ = res.__;

	res.locals.site.head.title = res.locals.title = __('add_website');

	var website = res.locals.website = { url: (req.body.url || '').trim().toLowerCase() };
	if (!/^http(s)?:/.test(website.url)) {
		website.url = 'http://' + website.url;
	}
	website.url = url.parse(website.url);
	website.host = website.url.host;

	if (!website.host || website.host.length < 4) {
		res.locals.message = __('invalid_website_url');
		return res.render('add');
	}

	Promise.props({
			captchaStatusCode: recaptcha(req.body['g-recaptcha-response'], req.ip),
			website: Data.access.website({
				host: website.host.replace(/^www\./, '')
			})
		})
		.then(function(result) {
			var dbWebsite = result.website;

			if (!(result.captchaStatusCode >= 200 && result.captchaStatusCode < 300)) {
				res.locals.message = __('invalid_recaptcha');
				return res.render('add');
			}

			if (dbWebsite && dbWebsite.host) {
				logger.warn('Found website on adding', { host: dbWebsite.host });
				return res.redirect(links.website(dbWebsite.host, { ul: currentCulture.language }));
			}

			var props = {
				liveWebsite: hostExplore(website.url.host)
					.catch(function(error) {
						res.locals.message = __(error.message);
					})
			};

			return Promise.props(props)
				.then(function(liveResult) {
					if (liveResult.liveWebsite) {
						website = liveResult.liveWebsite;
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
route.get('/:ul(ru)?/website/add', preWebsite, function(req, res) {
	res.locals.site.head.title = res.locals.title = res.__('add_website');

	res.render('add');
});

// POST edit website
route.post('/:ul(ru)?/website/edit/:id', preWebsite, function(req, res) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var lang = currentCulture.language;
	var __ = res.__;
	var id = req.params.id;

	if (!req.isAuthenticated()) {
		return res.redirect(links.login({ ul: lang, website: id, url: links.website.edit(id, { ul: lang }) }));
	}

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

			var websiteData = _.pick(req.body, res.locals.userIsAdmin ? ['title', 'description', 'keywords', 'categories', 'contentType', 'country', 'lang', 'status'] : ['title', 'description', 'keywords', 'categories', 'contentType']);
			websiteData.id = website.id;

			if (!utils.isNumber(websiteData.contentType)) {
				websiteData.contentType = null;
			}

			// console.log(websiteData);

			return Data.control.updateWebsite(websiteData)
				.then(function() {
					res.redirect(links.website.info(website.host, { ul: currentCulture.language, edited: 1 }));
				});

		}).catch(function(error) {
			logger.error('edit website error', error.message);
			res.redirect(links.website.edit(id, { ul: currentCulture.language, error: 1 }));
		});
});

// GET edit website
route.get('/:ul(ru)?/website/edit/:id', preWebsite, function(req, res, next) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var lang = currentCulture.language;
	var __ = res.__;
	var id = req.params.id;

	if (!req.isAuthenticated()) {
		return res.redirect(links.login({ ul: lang, website: id, url: links.website.edit(id, { ul: lang }) }));
	}

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

			res.locals.contentTypes = Data.contentTypes.types();
			res.locals.Categories = Data.categories.categories();
			res.locals.SubCategories = Data.categories.subCategories();

			res.locals.categories = helpers.formatWebsiteCategories(website);

			res.locals.website = website;

			return res.render('edit');

		}, next);
});
