'use strict';

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
