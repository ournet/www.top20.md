'use strict';

var Websites = require('ournet.data.websites');

exports.access = Websites.getCacheAccessService();
exports.control = Websites.getControlService();

exports.websites = function(where) {
  return exports.access.websites({
    where: where
  });
};

exports.countWebsites = function(where) {
  return exports.access.countWebsites(where);
};

exports.categories = Websites.categories;
exports.contentTypes = Websites.contentTypes;
