var express = require('express');
var core = require('ournet.core');
var util = require('util');
var utils = require('../utils.js');
var route = module.exports = express.Router();
var ShareInfo = require('../share_info.js');
var Data = require('../data');
var Catalog = require('../data/catalog');
var config = require('../config');
var Promise = core.Promise;
var _ = core._;


// search
route.get('/search', function(req, res, next) {
  var q = req.query.q;
  var links = req.app.locals.links;
  var currentCulture = res.locals.currentCulture;
  var homelink = links.home({
    ul: currentCulture.language
  });
  utils.maxageSearch(res);
  if (!q || q.trim().length < 2) {
    return res.redirect(homelink);
  }

  q = q.trim().toLowerCase();

  res.locals.site.head.title = res.locals.title = util.format(res.__('search_results_format'), q);

  var props = {
    catalog: Catalog.fill(false),
    websites: Data.access.websites({
      where: {
        country: config.country,
        status: 'active',
        $and: [{
          $or: [{
            host: q
          }, {
            keywords: q
          }]
        }]
      },
      limit: 10
    })
  };

  Promise.props(props).then(function(result) {
    if (result.websites && result.websites.length === 1) {
      return res.redirect(links.website(result.websites[0].host, {
        ul: currentCulture.language
      }));
    }
    res.locals.websites = result.websites;
    res.locals.catalog = result.catalog;
    res.render('search.jade');
  }).catch(next);
});


// website
route.get('/:host([a-z0-9][a-z0-9\.-]+.[a-z]{2,4})', function(req, res, next) {
  var links = req.app.locals.links;
  var currentCulture = res.locals.currentCulture;
  var homelink = links.home({
    ul: currentCulture.language
  });
  utils.maxageWebsite(res);

  Data.access.website({
    host: req.params.host
  }).then(function(website) {
    if (!website) {
      return res.redirect(homelink);
    }
    res.locals.website = website;
    res.locals.ContentTypes = Data.contentTypes;
    res.locals.Categories = Data.categories;
    res.locals.site.head.canonical = 'http://' + config.host + links.website(website.host, {
      ul: currentCulture.language
    });
    res.locals.site.head.title = website.title + ' - ' + website.host;
    res.locals.title = website.url;
    res.locals.site.head.description = website.description;
    res.locals.site.head.keywords = website.keywords.join(', ');
    res.render('website.jade');
  }).catch(next);
});

route.get('/to/:host', function(req, res, next) {
  var links = req.app.locals.links;
  var currentCulture = res.locals.currentCulture;
  var homelink = links.home({
    ul: currentCulture.language
  });
  utils.maxageRedirect(res);
  Data.access.website({
    host: req.params.host
  }).then(function(website) {
    if (!website || website.status !== 'active' || website.country !== config.country) {
      return res.redirect(homelink);
    }
    res.redirect('http://' + website.url);
  }).catch(next);
});
