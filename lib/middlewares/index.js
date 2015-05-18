module.exports = function(app) {
  app.use(require('./i18n'));
  app.use(require('./root'));
};
