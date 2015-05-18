var express = require('express');
var core = require('ournet.core');
var util = require('util');
var utils = require('../utils.js');
var route = express.Router();
var ShareInfo = require('../share_info.js');
var Db = require('../data/db');
var Catalog = require('../data/catalog');
var Categories = require('../data/categories');
var ContentTypes = require('../data/content_types');
var Promise = core.Promise;


// index
route.get('/', function(req, res, next) {
  renderCatalog(req, res, next);
});
route.get('/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page));
});

// category/type
route.get('/:c0', function(req, res, next) {
  renderCatalog(req, res, next, null, req.params.c0);
});
route.get('/:c0/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page), req.params.c0);
});

// category2/type
route.get('/:c0/:c1', function(req, res, next) {
  renderCatalog(req, res, next, null, req.params.c0, req.params.c1);
});
route.get('/:c0/:c1/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page), req.params.c0, req.params.c1);
});

// category3/type
route.get('/:c0/:c1/:c2', function(req, res, next) {
  renderCatalog(req, res, next, null, req.params.c0, req.params.c1, req.params.c2);
});
route.get('/:c0/:c1/:c2/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page), req.params.c0, req.params.c1, req.params.c2);
});

function renderCatalog(req, res, next, page, c0, c1, c2) {
  var config = res.locals.config;
  utils.maxageIndex(res);

  var currentCulture = res.locals.currentCulture,
    links = req.app.locals.links,
    __ = res.locals.__,
    title = __('general_rating');

  var type;

  if (c0) {
    type = ContentTypes.getTypeByName(c0);
    if (!type) {
      c0 = Categories.getCategoryByName(c0);
    }
  }

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

  Promise.props({
    types: Catalog.getContentTypes()
  }).then(function(result) {
    res.send(result);
  }).catch(next);


  // Db.websites({
  //   country: currentCulture.country,
  //   status: 'active'
  // }).then(function(websites) {
  //   res.send(websites);
  // }).catch(next);
}

module.exports = route;
