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


// search
route.get('/search', function(req, res, next) {
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
route.get('/info/:host', function(req, res, next) {
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
		res.locals.website = website;
		if (website.ratings) {
			res.locals.ratings = top20rating(website.ratings);
		}
		res.locals.ContentTypes = Data.contentTypes;
		res.locals.Categories = Data.categories;
		res.locals.site.head.canonical = 'http://' + config.host + links.website(website.host, {
			ul: currentCulture.language
		});
		res.locals.site.head.title = website.title + ' - ' + website.host;
		res.locals.title = website.url;
		res.locals.site.head.description = website.description;
		res.locals.site.head.keywords = website.keywords.join(', ');

		var categories = [];

		website.categories.forEach(function(c) {
			if (c.indexOf('c0') === 0) {
				c = parseInt(c.substr(3));
				c = Data.categories.category(c);
				if (c) {
					categories.push([c]);
				}
			}
		});

		website.categories.forEach(function(c) {
			if (c.indexOf('c1') === 0) {
				c = parseInt(c.substr(3));
				for (var i = categories.length - 1; i >= 0; i--) {
					var cats = categories[i];
					c = Data.categories.subCategory(cats[0].id, c);
					if (c) {
						cats.push(c);
						break;
					}
				}
			}
		});

		res.locals.categories = categories;

		res.render('website');
	}, next);
});

route.get('/to/:host', function(req, res, next) {
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

route.get('/add', function(req, res, next) {
	utils.maxageIndex(res);
	res.locals.noGoogleAds = true;
	res.locals.site.head.title = res.locals.title = res.__('add_website');
	Catalog.fill(false).then(function(catalog) {
		res.locals.catalog = catalog;
		res.render('add');
	}).catch(next);
});
