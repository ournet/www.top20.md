var external = module.exports;
var config = require('../config');
var Data = require('./index');
var core = require('ournet.core');
var _ = core._;
var Promise = core.Promise;

external.fill = function(fillWebsites, page, type, c0, c1) {
  page = page || 0;
  var typesParams = {
    where: {
      country: config.country,
      status: 'active',
      contentType: {
        $gt: 0
      }
    }
  };
  var categoriesParams = {
    where: {
      country: config.country,
      status: 'active',
      categories: /^c0/
    }
  };
  var subCategoriesParams = {
    where: {
      country: config.country,
      status: 'active',
    }
  };
  var websitesParams = {
    where: {
      country: config.country,
      status: 'active',
    },
    limit: 20,
    offset: page * 20
  };
  var newWebsitesParams = {
    where: {
      country: config.country,
      status: 'active'
    },
    order: '-createdAt',
    limit: 6
  };
  if (c0) {
    typesParams.where.categories = 'c0-' + c0.id;
    websitesParams.where.categories = 'c0-' + c0.id;
    newWebsitesParams.where.categories = 'c0-' + c0.id;
    if (type) {
      subCategoriesParams.where.contentType = type.id;
    }
  }
  if (type) {
    categoriesParams.where.contentType = type.id;
    websitesParams.where.contentType = type.id;
    newWebsitesParams.where.contentType = type.id;
  }

  var props = {
    types: Data.access.contentTypesStat(typesParams),
    categories: Data.access.categoriesStat(categoriesParams)
  };

  if (fillWebsites) {
    props.websites = Data.access.websites(websitesParams);
    props.websitesCount = Data.access.websitesCount(websitesParams.where);
    props.newWebsites = Data.access.websites(newWebsitesParams);
  }

  if (c0) {
    var list = Data.categories.subCategories(c0.id).map(function(c) {
      return 'c1-' + c.id;
    });
    subCategoriesParams.where.categories = {
      $in: list
    };
    subCategoriesParams.category = c0.id;
    props.subCategories = Data.access.subCategoriesStat(subCategoriesParams);
  }
  return Promise.props(props).then(function(catalog) {
    catalog.url = urlBuilder;
    catalog.urlLang = urlLang;
    return catalog;
  });
};

external.urlLang = urlLang;
external.urlBuilder = urlBuilder;

function urlLang(url, lang) {
  if (lang && lang !== 'ro') {
    return url + '?ul=' + lang;
  }
  return url;
}

function urlBuilder() {
  var agrs = Array.prototype.slice.call(arguments);
  var link = '';
  agrs.forEach(function(param) {
    if (param) {
      link += '/' + param;
    }
  });
  return link.length === 0 ? '/' : link;
}
