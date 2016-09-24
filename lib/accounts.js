'use strict';

var config = require('./config');
var dynamoStorage = require('dynamo-accounts').storage();
var accounts = require('accounts')(dynamoStorage);

accounts.admin.sync();

module.exports = accounts.app(config.accounts.appId);
