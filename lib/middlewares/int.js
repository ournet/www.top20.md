'use strict';

var utils = require('../utils');

module.exports = function(req, res) {
  utils.maxageRedirect(res);

  res.redirect(301, '/');
};
