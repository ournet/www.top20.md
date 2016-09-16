'use strict';

module.exports = {
	name: 'Moldova Top20',
	favicon: 'http://assets.ournetcdn.net/top20/img/icons/icon-48.ico',
	language: 'ro',
	languages: ['ro', 'ru'],
	country: 'md',
	timezone: 'Europe/Chisinau',
	domain: 'top20.md',
	host: 'www.top20.md',
	email: 'info@top20.md',
	googleAnalyticsId: 'UA-1490399-1',
	shareDataServices: ['facebook', 'twitter', 'odnoklassniki', 'google-plus'],
	capitalId: 618426,

	assets: {
		css: {
			main: '6b3f96bc7f'
		}
	},

	sessions: {
		cookieName: process.env.SESSIONS_COOKIE_NAME || 'TP20S',
		secret: process.env.SESSIONS_SECRET
	},

	auth0: {
		clientId: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		domain: process.env.AUTH0_DOMAIN
	}
};
