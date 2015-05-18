var external = module.exports;
var _ = require('ournet.core')._;

external.getTypes = function() {
  return TYPES;
};

external.getTypeByName = function(name) {
  return external.getTypeBy('name', name);
};

external.getTypeById = function(id) {
  return external.getTypeBy('id', id);
};

external.getTypeBy = function(name, value) {
  var type;
  var types = external.getTypes();
  for (var i = types.length - 1; i >= 0; i--) {
    type = types[i];
    if (type[name] === value) return type;
  }
};


var TYPES = [{
  id: 6,
  name: 'anunturi',
  ro: 'Anunțuri',
  ru: 'Объявлений'
}, {
  id: 2,
  name: 'bloguri',
  ro: 'Bloguri',
  ru: 'Блоги'
}, {
  id: 5,
  name: 'comert-electronic',
  ro: 'Comerț electronic',
  ru: 'Электронная торговля'
}, {
  id: 7,
  name: 'corporative',
  ro: 'Corporative',
  ru: 'Корпоративные'
}, {
  id: 3,
  name: 'forum',
  ro: 'Forum',
  ru: 'Форум'
}, {
  id: 4,
  name: 'portal',
  ro: 'Portal',
  ru: 'Портал'
}, {
  id: 1,
  name: 'stiri',
  ro: 'Știri',
  ru: 'Новости'
}];
