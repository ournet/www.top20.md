'use strict';

var _ = require('./utils')._;

// function formatText(text) {
// 	if (text) {
// 		return text.replace(/\r/g, '').replace(/\n{2,}/g, '\n').replace(/ {2,}/g, ' ').trim();
// 	}
// 	return text;
// }

function isSafeText(text) {
	if (text) {
		return !/(^|\b)(porn\w*|cur|cacat|escort\w*|curve|curva|xxx|порно|эскорт)(\b|$)/.test(text);
	}

	return true;
}

function inRange(text, min, max) {
	if (!text) {
		return false;
	}
	text = text.trim();
	if (max) {
		return text.length >= min && text.length <= max;
	}
	return text.length >= min;
}

function isValidTitle(text, options) {
	options = _.defaults(options, { min: 2, max: 100 });
	return inRange(text, options.min, options.max) && isSafeText(text);
}

function isValidSummary(text, options) {
	options = _.defaults(options, { min: 50, max: 500 });
	return inRange(text, options.min, options.max) && isSafeText(text);
}

function formatKeywords(text) {
	if (!text) {
		return [];
	}
	return text.split(/([\t\n\r;,|\[\]\/:\?!—]+|\.\s)/g)
		.map(function(w) {
			return w.trim().replace(/\s{2,}/g, ' ').trim();
		})
		.filter(function(w) {
			return w.length > 2 && w.length < 50;
		});
}

function isValidKeywords(keywords, options) {
	options = _.defaults(options, { min: 3, max: 50 });
	if (keywords.length < options.min || keywords.length > options.max) {
		return false;
	}
	for (var i = keywords.length - 1; i >= 0; i--) {
		if (!isSafeText(keywords[i])) {
			return false;
		}
	}
	return true;
}

function formatWebsite(website) {
	website.title = website.title.replace(/\s+/g, ' ').replace(/ {2,}/g, ' ').trim();
	website.description = website.description.replace(/\s+/g, ' ').replace(/ {2,}/g, ' ').trim();
	website.keywords = formatKeywords(website.keywords);

	return website;
}

exports.validate = function(website) {
	formatWebsite(website);

	return isValidTitle(website.title) && isValidSummary(website.description) && isValidKeywords(website.keywords);
};

exports.isSafeText = isSafeText;
exports.format = formatWebsite;
