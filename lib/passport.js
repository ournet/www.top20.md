'use strict';

var passport = module.exports = require('passport');
var Auth0Strategy = require('passport-auth0');
var config = require('./config');

passport.serializeUser(function(user, done) {
	console.log('serializeUser');
	console.log(user);
	return done(null, user.id.toString());
});

passport.deserializeUser(function(id, done) {
	console.log('deserializeUser', id);
	done(null, { id: id });
});

//Auth0
passport.use(new Auth0Strategy({
		domain: config.auth0.domain,
		clientID: config.auth0.clientId,
		clientSecret: config.auth0.clientSecret,
		callbackURL: '/auth/auth0/callback'
	},
	function(accessToken, refreshToken, extraParams, profile, done) {
		// accessToken is the token to call Auth0 API (not needed in the most cases)
		// extraParams.id_token has the JSON Web Token
		// profile has all the information from the user
		return done(null, profile);
	}
));

//google

// passport.use(new GoogleStrategy({
// 		clientID: config.google.clientId,
// 		clientSecret: config.google.clientSecret,
// 		callbackURL: 'http://' + config.app.host + '/auth/google/callback'
// 			//passReqToCallback: true
// 	},
// 	function(accessToken, refreshToken, profile, done) {
// 		var accessData = {
// 			accessToken: accessToken,
// 			refreshToken: refreshToken
// 		};
// 		process.nextTick(function() {
// 			profile.id = profile.id.toString();
// 			accountsApi.accounts.providerLogin(profile, accessData).then(function(account) {
// 				return done(null, account);
// 			}).catch(done);
// 		});
// 	}
// ));
