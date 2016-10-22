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
			main: '4197431620'
		},
		js: {
			website: 'ac987cecc9'
		}
	},

	sessions: {
		cookieName: process.env.SESSIONS_COOKIE_NAME || 'TP20S',
		secret: process.env.SESSIONS_SECRET
	},

	google: {
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	},

	facebook: {
		clientId: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET
	},

	accounts: {
		appId: process.env.ACCOUNTS_APP_ID
	}
};
