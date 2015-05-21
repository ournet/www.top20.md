var _package = require('../../package.json');
var config = require('../config');
var core = require('ournet.core');
var Data = require('../data');
var utils = require('../utils.js');
var util = {
  moment: require('moment'),
  format: require('util').format,
  startWithUpperCase: core.util.startWithUpperCase,
  numberFormat: core.util.numberFormat,
  wrapAt: core.text.wrapAt
};
var Promise = core.Promise;
var Countries = require('simple-iso-countries');

module.exports = function(req, res, next) {
  var culture = res.locals.currentCulture = {
    country: 'us'
  };

  res.locals.site = {
    name: config.name,
    head: {}
  };

  var regex = /\/int\/(\w\w)(?:\/|$)/i;
  var result = regex.exec(req.originalUrl);
  if (result) {
    culture.country = result[1].toLowerCase();
  }
  //console.log(req.originalUrl, culture);
  culture.countryName = Countries[culture.country.toUpperCase()];

  res.locals.config = config;

  res.locals.project = {
    version: _package.version,
  };

  res.locals.categories = Data.categories.categories();

  //res.locals.noGoogleAds = true;

  res.locals.util = util;

  utils.maxage(res, 60 * 24 * 30);

  var props = {
    countries: Data.access.intCountries(),
    newWebsites: Data.access.intWebsites({
      where: {
        country: culture.country
      },
      order: '-createdAt',
      limit: 20,
      select: '_id url title'
    })
  };

  Promise.props(props).then(function(result) {
    //console.log(result);
    res.locals.newWebsites = result.newWebsites;
    res.locals.countries = result.countries;
    if (!result.countries[0].name) {
      result.countries.forEach(function(cn) {
        cn.name = Countries[cn.id.toUpperCase()];
      });
    }
  }).finally(next);
};
