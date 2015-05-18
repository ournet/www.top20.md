var express = require('express');
var core = require('ournet.core');
var util = require('util');
var utils = require('../utils.js');
var route = express.Router();
var ShareInfo = require('../share_info.js');
var Data = require('../data');


//index
route.get('/', function(req, res, next) {
  var config = res.locals.config;
  utils.maxageIndex(res);

  var currentCulture = res.locals.currentCulture,
    links = req.app.locals.links,
    __ = res.locals.__,
    title = __('general_rating');

  res.locals.title = res.locals.site.head.title = __('title');
  res.locals.site.head.description = __('description');

  res.locals.site.head.canonical = 'http://' + config.host + links.home({
    ul: currentCulture.language
  });

  res.locals.shareInfo = ShareInfo({
    clientId: "index",
    identifier: res.locals.site.head.canonical,
    url: res.locals.site.head.canonical,
    title: res.locals.site.head.title,
    summary: res.locals.site.head.description
  });

  Data.websites({
    country: currentCulture.country,
    status: 'active'
  }).then(function(websites) {
    res.send(websites);
  }).catch(next);
});

module.exports = route;
