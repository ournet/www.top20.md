var express = require('express');
var core = require('ournet.core');
var utils = require('../utils.js');
var route = module.exports = express.Router();
var Data = require('../data');
var Catalog = require('../data/catalog');
var config = require('../config');
var Promise = core.Promise;
var _ = core._;


// favicon
route.get('/favicon.ico', function(req, res, next) {
  utils.maxageRedirect(res);

  res.redirect(301, config.favicon);
});

// websites/control/add
route.get('/websites/control/add', function(req, res, next) {
  utils.maxageRedirect(res);

  var links = req.app.locals.links;
  res.redirect(301, links.add());
});

// ct-2
route.get('/ct-:type(\\d+)', function(req, res, next) {
  utils.maxageRedirect(res);

  var links = req.app.locals.links;
  var type = Data.contentTypes.type(parseInt(req.params.type));
  if (!type) {
    return res.redirect(links.home());
  }
  if(req.query.page)
    res.redirect(301, links.catalog.typePage(type.name, req.query.page));
  else
    res.redirect(301, links.catalog.type(type.name));
});

// ct-2/c-23
route.get('/ct-:type(\\d+)/c-:c0(\\d+)', function(req, res, next) {
  utils.maxageRedirect(res);

  var links = req.app.locals.links;
  var type = Data.contentTypes.type(parseInt(req.params.type));
  if (!type) {
    return res.redirect(links.home());
  }
  var c0 = Data.categories.category(parseInt(req.params.c0));
  if (!c0) {
    return res.redirect(links.home());
  }
  if(req.query.page)
    res.redirect(301, links.catalog.typeCategoryPage(type.name, c0.name, req.query.page));
  else
    res.redirect(301, links.catalog.typeCategory(type.name, c0.name));
});
// ct-2/c-23-234
route.get('/ct-:type(\\d+)/c-:c0(\\d+)-:c1(\\d+)', function(req, res, next) {
  utils.maxageRedirect(res);

  var links = req.app.locals.links;
  var type = Data.contentTypes.type(parseInt(req.params.type));
  if (!type) {
    return res.redirect(links.home());
  }
  var c0 = Data.categories.category(parseInt(req.params.c0));
  if (!c0) {
    return res.redirect(links.home());
  }
  var c1 = Data.categories.subCategory(c0.id,parseInt(req.params.c1));
  if (!c1) {
    return res.redirect(links.home());
  }
  if(req.query.page)
    res.redirect(301, links.catalog.typeSubCategoryPage(type.name, c0.name, c1.name, req.query.page));
  else
    res.redirect(301, links.catalog.typeSubCategory(type.name, c0.name, c1.name));
});

// c-23
route.get('/c-:c0(\\d+)', function(req, res, next) {
  utils.maxageRedirect(res);

  var links = req.app.locals.links;
  var c0 = Data.categories.category(parseInt(req.params.c0));
  if (!c0) {
    return res.redirect(links.home());
  }
  if(req.query.page)
    res.redirect(301, links.catalog.categoryPage(c0.name, req.query.page));
  else
    res.redirect(301, links.catalog.category(c0.name));
});
// c-23-234
route.get('/c-:c0(\\d+)-:c1(\\d+)', function(req, res, next) {
  utils.maxageRedirect(res);

  var links = req.app.locals.links;
  var c0 = Data.categories.category(parseInt(req.params.c0));
  if (!c0) {
    return res.redirect(links.home());
  }
  var c1 = Data.categories.subCategory(c0.id,parseInt(req.params.c1));
  if (!c1) {
    return res.redirect(links.home());
  }
  if(req.query.page)
    res.redirect(301, links.catalog.subCategoryPage(c0.name, c1.name, req.query.page));
  else
    res.redirect(301, links.catalog.subCategory(c0.name, c1.name));
});

// info/website
route.get('/info/:host', function(req, res, next) {
  utils.maxageRedirect(res);

  var links = req.app.locals.links;
  Data.access.website({
    host: req.params.host
  }).then(function(website) {
    if (!website) {
      return res.redirect(links.home());
    }
    res.redirect(301, links.website(website.host));
  }).catch(next);
});
