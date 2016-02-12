'use strict';

var utils = require('ournet.utils');
var _ = require('lodash');
var Promise = require('bluebird');

var NO_CACHE = 'private, max-age=0, no-cache';
var PUBLIC_CACHE = 'public, max-age=';
var CACHE_CONTROL = 'Cache-Control';
/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
exports.maxage = function(res, maxage) {
	//maxage=0;
	var cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
	}
	res.set(CACHE_CONTROL, cache);
};

exports.maxageRedirect = function(res) {
	exports.maxage(res, 60 * 12);
};

exports.maxageSearch = function(res) {
	exports.maxage(res, 60 * 12);
};

exports.maxageWebsite = function(res) {
	exports.maxage(res, 60 * 6);
};

exports.maxageIndex = function(res) {
	exports.maxage(res, 60 * 2);
};

exports.wrapAt = function(text, len) {
	if (text && text.length > len) {
		return text.substr(0, len - 3) + '...';
	}
	return text;
};

exports.startWithUpperCase = function(text) {
	if (text && text.length > 0) {
		return text[0].toUpperCase() + text.substr(1);
	}
	return text;
};

module.exports = exports = _.assign({
	_: _,
	Promise: Promise
}, exports, utils);
