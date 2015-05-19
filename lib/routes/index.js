module.exports = function(app) {
  app.use(require('./home.js'));
  app.use(require('./catalog.js'));
};
