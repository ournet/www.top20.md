'use strict';

var utils = require('../utils.js');

module.exports = function(req, res) {
  utils.maxageRedirect(res);

  res.redirect(301, '/');
};
