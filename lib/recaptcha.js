'use strict';

var request = require('request');
var utils = require('./utils');
var Promise = utils.Promise;

module.exports = function(value, ip) {
	return new Promise(function(resolve, reject) {
		request({
			url: 'https://www.google.com/recaptcha/api/siteverify',
			method: 'POST',
			formData: {
				secret: process.env.RECAPTCHA_SECRET,
				response: value,
				remoteip: ip
			}
		}, function(error, response, body) {
			if (error) {
				return reject(error);
			}
			resolve(response.statusCode);
		});
	});
};
