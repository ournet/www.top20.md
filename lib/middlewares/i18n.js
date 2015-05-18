var i18n = require('i18n');
var  moment = require('moment');
var  core = require('ournet.core');
var config = require('../config');

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: config.languages,

  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',

  defaultLocale: config.languages[0]
});

module.exports = function(req, res, next) {
  var locale;
  if (req.query.ul && config.languages.indexOf(req.query.ul) > -1)
    locale = req.query.ul;
  else locale = config.languages[0];
  res.locals.locale = res.locale = locale;
  i18n.init(req, res);
  res.setLocale(locale);

  return next();
};
