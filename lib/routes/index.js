'use strict';

module.exports = function(app) {

	// redirect /int
	app.use('/int', require('../middlewares/int'));

	// all redirects
	app.use(require('./redirect'));

	app.use(require('../middlewares/i18n'));
	app.use(require('../middlewares/root'));

	app.use(require('./auth'));

	app.use(require('./home'));
	app.use(require('./website'));
	app.use(require('./catalog'));
};
