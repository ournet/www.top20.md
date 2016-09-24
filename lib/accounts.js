'use strict';

var config = require('./config');
var dynamoStorage = require('dynamo-accounts').storage();
var accounts = require('accounts')(dynamoStorage);
var cachify = require('transparentcache');

accounts.admin.sync();

var app = module.exports = accounts.app(config.accounts.appId);

cachify(app.users, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 20 }),
	methods: { getById: [0] }
});
