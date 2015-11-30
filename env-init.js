/*eslint no-process-exit:0*/

'use strict';

var dotenv = require('dotenv-prompt');

var envs = ['WEBSITES_CONNECTION', 'LOGGLY_TOKEN'];

var options = {
  defaults: {
    'LOGGLY_DOMAIN': 'ournet',
    'NODE_ENV': 'production',
    'PORT': 7701
  }
};

dotenv.create(envs, options, function(error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});
