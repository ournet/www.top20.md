'use strict';

var util = require('util');

var DATA = {
	'facebook': ['http://www.facebook.com/sharer/sharer.php?u=%s', 1],
	'twitter': ['http://twitter.com/share?url=%s&text=%s', 2],
	'vkontakte': ['http://vkontakte.ru/share.php?url=%s', 1],
	'odnoklassniki': ['http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl=%s', 1],
	'google-plus': ['http://plus.google.com/share?url=%s', 1]
};

module.exports = function(data) {
	var info = data || {};

	info.getShareUrl = function(service) {
		var item = DATA[service];
		if (item[1] > 1) {
			return util.format(item[0], encodeURIComponent(info.url), encodeURIComponent(info.title));
		}
		return util.format(item[0], encodeURIComponent(info.url));
	};

	return info;
};
