var external = module.exports;
var db = require('./db');
var core = require('ournet.core');
var Promise = core.Promise;
var ContentTypes = require('./content_types');

external.getContentTypes = function() {
  var item;
  return db.access.contentTypes({
      where: {
        country: 'md',
        status: 'active'
      }
    })
    .then(function(types) {
      return types.map(function(t) {
        item = ContentTypes.getTypeById(t._id);
        if (item)
          item.count = t.count;
        else item = {};
        return item;
      });
    });
};
