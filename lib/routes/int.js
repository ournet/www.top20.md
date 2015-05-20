var express = require('express');
var core = require('ournet.core');
var util = require('util');
var utils = require('../utils.js');
var route = module.exports = express.Router();
var ShareInfo = require('../share_info.js');
var Data = require('../data');
var Catalog = require('../data/catalog');
var config = require('../config');
var top20rating = require('top20rating');
var Promise = core.Promise;
var _ = core._;

route.get('/', function(req, res, next) {
  res.redirect('/int/us');
});

// website
route.get('/info/:id', function(req, res, next) {
  Data.access.intWebsite({
    id: req.params.id
  }).then(function(website) {
    if (!website) {
      return res.redirect('/int/us');
    }
    res.locals.website = website;

    res.locals.site.head.canonical = 'http://' + config.host + '/int/info/' + req.params.id;
    res.locals.site.head.title = website.url + ' - ' + website.title;
    //res.locals.title = website.url;
    res.locals.site.head.description = website.description;
    res.locals.site.head.keywords = website.keywords;

    res.render('int/website.jade');
  }).catch(next);
});
