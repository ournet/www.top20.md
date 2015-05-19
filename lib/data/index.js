var Websites = require('ournet.data.websites');
var external = module.exports;

external.access = Websites.getAccessService();
external.control = Websites.getControlService();

external.websites = function(where) {
  return external.access.websites({
    where: where
  });
};

external.countWebsites = function(where) {
  return external.access.countWebsites(where);
};

external.categories = Websites.categories;
external.contentTypes = Websites.contentTypes;