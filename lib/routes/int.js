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
var Countries = require('simple-iso-countries');

route.get('/', function(req, res, next) {
  res.redirect('/int/us');
});
route.get('/s/:q', function(req, res, next) {
  res.redirect('/int/search?cx=partner-pub-0728889348996824:6629020902&cof=FORID:10&ie=UTF-8&q='+encodeURIComponent(req.params.q));
});

route.get('/countries', function(req, res, next) {
  res.locals.title = res.locals.site.head.title = 'Select a country';
  res.render('int/countries.jade');
});

route.get('/search', function(req, res, next) {
  res.locals.site.head.title = 'Search results for ' + req.query.q;
  res.locals.title = req.query.q;
  res.locals.noRight = true;
  res.render('int/search.jade');
});

// website
route.get('/:country(\\w\\w)', function(req, res, next) {
  renderCatalog(req, res, next);
});
route.get('/:country(\\w\\w)/c-:category(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next);
});

function renderCatalog(req, res, next) {
  if (req.query.page) {
    return res.redirect(301, '/int' + req.path);
  }
  var params = {
    where: {
      country: req.params.country.toLowerCase(),
    },
    limit: 20,
    order: '-countViews'
  };
  if (req.params.category) {
    params.where.category = parseInt(req.params.category);
    res.locals.category = Data.categories.category(params.where.category);
  }

  res.locals.page = 0;
  res.locals.site.head.title = 'Web Directory: ' + res.locals.currentCulture.countryName;
  if (res.locals.category) {
    res.locals.site.head.title += ' - ' + res.locals.category.en;
  }

  res.locals.title = res.locals.site.head.title;

  Data.access.intWebsites(params, {
    cache: false
  }).then(function(websites) {
    if (!websites) {
      console.log('no websites');
      return res.redirect('/int/us');
    }
    res.locals.websites = websites;
    res.render('int/catalog.jade');
  }).catch(next);
}

// website
route.get('/info/:id', function(req, res, next) {
  Data.access.intWebsite({
    id: req.params.id
  }).then(function(website) {
    if (!website) {
      return res.redirect('/int/us');
    }
    res.locals.website = website;
    if (website.country !== res.locals.currentCulture.country) {
      res.locals.currentCulture.country = website.country;
      res.locals.currentCulture.countryName = Countries[website.country.toUpperCase()];
    }
    res.locals.site.head.canonical = 'http://' + config.host + '/int/info/' + req.params.id;
    res.locals.site.head.title = website.url + ' - ' + website.title;
    //res.locals.title = website.url;
    res.locals.site.head.description = website.description;
    res.locals.site.head.keywords = website.keywords;

    res.locals.category = Data.categories.category(website.category);
    res.locals.keywords = core.text.splitKeywords(website.keywords) || [];

    var similarParams = {
      where: {
        country: website.country,
      },
      limit: 5,
      select: '_id title url description countViews',
      offset: Math.random() * 10
    };

    if (website.category) {
      similarParams.where.category = website.category;
    }

    return Data.access.intWebsites(similarParams, {
      cache: false
    }).then(function(sites) {
      res.locals.similarWebsites = sites;
      res.render('int/website.jade');
    });
  }).catch(next);
});
