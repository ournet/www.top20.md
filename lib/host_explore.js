'use strict';

var utils = require('./utils');
var Promise = utils.Promise;
var explorer = require('html-explorer');
var url = require('url');
var logger = require('./logger');

module.exports = function(host) {

	if (!host && host.length < 4) {
		return Promise.reject({ error: true, message: 'invalid_website_url' });
	}

	return explorer.explore('http://' + host, {
			page: {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
				}
			},
			images: false,
			videos: false
		})
		.then(function(webpage) {
			webpage.href = url.parse(webpage.href);
			if (host.replace(/^www\./, '') !== webpage.href.host.replace(/^www\./, '')) {
				logger.error('Host ' + host + ' != ' + webpage.href.host, { host: host });
				return Promise.reject({ error: true, message: 'invalid_website_url' });
			}

			host = webpage.href.host.replace(/^www\./, '');

			var country = /(\w+)$/.exec(host)[1];

			if (country.length !== 2) {
				country = 'md';
			}

			var lang = country === 'md' ? 'ro' : country;

			webpage.feeds = (webpage.feeds || []).filter(function(feed) {
				return !/(comments|comentarii)/g.test(feed.title);
			});

			return {
				title: webpage.title,
				url: webpage.href.host,
				host: host,
				description: webpage.description,
				keywords: webpage.keywords,
				country: country,
				lang: lang,
				feeds: webpage.feeds
			};

		}, function(error) {
			logger.error('Error on exploring website', { info: error.message, host: host });
			return Promise.reject({ error: true, message: 'cannot_explore_website_url' });
		});
};
