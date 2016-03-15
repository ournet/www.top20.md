'use strict';

var Data = require('./data');

exports.formatWebsiteCategories = function(website) {
	var categories = [];

	if (!website.categories || website.categories.length === 0) {
		return categories;
	}

	website.categories.forEach(function(c) {
		if (c.indexOf('c0') === 0) {
			c = parseInt(c.substr(3));
			c = Data.categories.category(c);
			if (c) {
				categories.push([c]);
			}
		}
	});

	website.categories.forEach(function(c) {
		if (c.indexOf('c1') === 0) {
			c = parseInt(c.substr(3));
			for (var i = categories.length - 1; i >= 0; i--) {
				var cats = categories[i];
				c = Data.categories.subCategory(cats[0].id, c);
				if (c) {
					cats.push(c);
					break;
				}
			}
		}
	});

	return categories;
};
