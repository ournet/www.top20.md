'use strict';

var express = require('express');
var util = require('util');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var Data = require('../data');
var Catalog = require('../data/catalog');
var config = require('../config');
var top20rating = require('top20rating');
var Promise = utils.Promise;
var helpers = require('../helpers');


// search
route.get('/:ul(ru)?/search', function(req, res, next) {
	var q = req.query.q;
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var homelink = links.home({
		ul: currentCulture.language
	});
	utils.maxageSearch(res);
	if (!q || q.trim().length < 2) {
		return res.redirect(homelink);
	}

	q = q.trim().toLowerCase();

	res.locals.site.head.title = res.locals.title = util.format(res.__('search_results_format'), q);

	var props = {
		catalog: Catalog.fill(false),
		websites: Data.access.websites({
			where: {
				country: config.country,
				status: 'active',
				$and: [{
					$or: [{
						host: q
					}, {
						keywords: q
					}]
				}]
			},
			limit: 10,
			order: '-ratings.rank'
		})
	};

	Promise.props(props).then(function(result) {
		if (result.websites && result.websites.length === 1) {
			return res.redirect(links.website(result.websites[0].host, {
				ul: currentCulture.language
			}));
		}
		res.locals.websites = result.websites;
		res.locals.catalog = result.catalog;
		res.render('search.jade');
	}).catch(next);
});


// website
route.get('/:ul(ru)?/info/:host', function(req, res, next) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var homelink = links.home({
		ul: currentCulture.language
	});
	utils.maxageWebsite(res);

	var getWebsite = Data.access.website({
		host: req.params.host
	});

	getWebsite.then(function(website) {
		if (!website) {
			return res.redirect(homelink);
		}
		if (website.status !== 'active' && !req.isAuthenticated()) {
			return res.redirect(links.home({
				ul: currentCulture.language,
				utm_source: 'website-info',
				utm_medium: 'url',
				utm_campaign: 'inactive'
			}));
		}
		res.locals.website = website;
		if (website.ratings) {
			res.locals.ratings = top20rating(website.ratings);
		}
		res.locals.ContentTypes = Data.contentTypes;
		res.locals.Categories = Data.categories;
		res.locals.site.head.canonical = 'https://' + config.host + links.website(website.host, {
			ul: currentCulture.language
		});
		res.locals.site.head.title = website.title + ' - ' + website.host;
		res.locals.title = website.url;
		res.locals.site.head.description = website.description;
		res.locals.site.head.keywords = website.keywords.join(', ');

		res.locals.categories = helpers.formatWebsiteCategories(website);

		res.render('website');
	}, next);
});

// redirect to website
route.get('/:ul(ru)?/to/:host', function(req, res, next) {
	var links = req.app.locals.links;
	var currentCulture = res.locals.currentCulture;
	var homelink = links.home({
		ul: currentCulture.language
	});
	var host = req.params.host;
	if (host.indexOf('www.') === 0) {
		host = host.substr(4);
	}

	utils.maxageRedirect(res);
	Data.access.website({
			host: host
		})
		.then(function(website) {
			if (!website || website.status !== 'active' || website.country !== config.country) {
				return res.redirect(homelink);
			}
			res.redirect('http://' + website.url);
		}, next);
});
