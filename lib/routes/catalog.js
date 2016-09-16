'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var Data = require('../data');
var Catalog = require('../data/catalog');
var _ = utils._;

function buildPagger(total, page, type, c0, c1, lang) {
  var list = [];
  var pages = parseInt(total / 20) + 1;
  var i = page - 5;
  i = i > -1 ? i : 0;
  for (; i < page + 5 && i < pages; i++) {
    list.push({
      text: i + 1,
      url: Catalog.urlLang(Catalog.urlBuilder(type && type.name, c0 && c0.name, c1 && c1.name, i), lang),
      selected: page === i
    });
  }
  return list;
}

function renderCatalog(req, res, next, page, typeString, c0String, c1String) {
  var config = res.locals.config;
  page = page || 0;
  utils.maxageIndex(res);
  var type = typeString;
  var c0 = c0String;
  var c1 = c1String;

  var currentCulture = res.locals.currentCulture,
    links = req.app.locals.links,
    __ = res.locals.__;

  // fix type/category problem:
  if (type) {
    var tp = Data.contentTypes.type(type);
    if (!tp) {
      c1 = c0;
      c0 = type;
    }
    type = tp;
  }
  if (c0) {
    c0 = Data.categories.category(c0);
    if (c0 && c1) {
      c1 = Data.categories.subCategory(c0.id, c1);
    }
  } else {
    c1 = null;
  }

  if (typeString && !type && !c0) {
    return res.redirect(links.home({
      ul: currentCulture.language
    }));
  }

  var webDirectory = __('web_directory');
  var title = [];

  res.locals.catalog = {
    page: page || 0,
    title: title
  };

  var canonical = 'http://' + config.host;

  if (type) {
    title.push(type[currentCulture.language]);
    res.locals.catalog.type = type;
    canonical += '/' + type.name;
    res.locals.location.push({
      url: links.catalog.type(type.name, {
        ul: currentCulture.language
      }),
      text: type[currentCulture.language]
    });
  }
  if (c0) {
    title.push(c0[currentCulture.language]);
    res.locals.catalog.category = c0;
    canonical += '/' + c0.name;
    if (type) {
      res.locals.location.push({
        url: links.catalog.typeCategory(type.name, c0.name, {
          ul: currentCulture.language
        }),
        text: c0[currentCulture.language]
      });
    } else {
      res.locals.location.push({
        url: links.catalog.category(c0.name, {
          ul: currentCulture.language
        }),
        text: c0[currentCulture.language]
      });
    }
  }
  if (c1) {
    title.push(c1[currentCulture.language]);
    res.locals.catalog.subCategory = c1;
    canonical += '/' + c1.name;
    if (type) {
      res.locals.location.push({
        url: links.catalog.typeSubCategory(type.name, c0.name, c1.name, {
          ul: currentCulture.language
        }),
        text: c1[currentCulture.language]
      });
    } else {
      res.locals.location.push({
        url: links.catalog.subCategory(c0.name, c1.name, {
          ul: currentCulture.language
        }),
        text: c1[currentCulture.language]
      });
    }
  }
  if (page > 0) {
    canonical += '/' + page;
  }

  if (title.length === 0) {
    title.push(__('general_rating'));
  }

  res.locals.site.head.title = webDirectory + ': ' + title.join(' - ') + (page > 0 ? ' (' + page + ') ' : null) + ' — ' + __('site_title');

  res.locals.title = title.join(': ');

  res.locals.site.head.canonical = canonical;

  Catalog.fill(true, page, type, c0, c1).then(function(result) {
    res.locals.catalog = _.assign(res.locals.catalog, result);
    res.locals.catalog.pagger = buildPagger(result.websitesCount, page, type, c0, c1, currentCulture.language);

    res.render('catalog');
  }).catch(next);
}


// index
route.get('/:ul(ru)?/', function(req, res, next) {
  var links = req.app.locals.links;
  if (req.query.d) {
    return res.redirect(301, links.website(req.query.d.replace(/^www\./i, '').toLowerCase()));
  }
  renderCatalog(req, res, next);
});

route.get('/:ul(ru)?/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page));
});

// category/type
route.get('/:ul(ru)?/:c0', function(req, res, next) {
  renderCatalog(req, res, next, null, req.params.c0);
});

route.get('/:ul(ru)?/:c0/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page), req.params.c0);
});

// category2/type
route.get('/:ul(ru)?/:c0/:c1', function(req, res, next) {
  renderCatalog(req, res, next, null, req.params.c0, req.params.c1);
});

route.get('/:ul(ru)?/:c0/:c1/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page), req.params.c0, req.params.c1);
});

// category3/type
route.get('/:ul(ru)?/:c0/:c1/:c2', function(req, res, next) {
  renderCatalog(req, res, next, null, req.params.c0, req.params.c1, req.params.c2);
});

route.get('/:ul(ru)?/:c0/:c1/:c2/:page(\\d+)', function(req, res, next) {
  renderCatalog(req, res, next, parseInt(req.params.page), req.params.c0, req.params.c1, req.params.c2);
});

