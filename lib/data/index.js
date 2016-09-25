'use strict';

var Websites = require('top20websites');
var cachify = require('transparentcache');

var access = exports.access = Websites.getAccessService();
exports.control = Websites.getControlService();

// methods

exports.websites = function(where) {
	return access.websites({
		where: where
	});
};

exports.countWebsites = function(where) {
	return access.countWebsites(where);
};

exports.categories = Websites.categories;
exports.contentTypes = Websites.contentTypes;

//cachify
//

cachify(access, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 5 }),
	methods: { websites: [0], websitesCount: [0] }
});

cachify(access, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 20 }),
	methods: { contentTypesStat: [0], categoriesStat: [0], subCategoriesStat: [0] }
});
