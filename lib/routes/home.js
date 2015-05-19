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

  res.locals.head.title = res.locals.title = util.format(res.__('search_results_format'), q);

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
