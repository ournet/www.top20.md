'use strict';

var passport = module.exports = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//var GithubStrategy = require('passport-github').Strategy;
var config = require('./config');
var Accounts = require('./accounts');

passport.serializeUser(function(user, done) {
	// console.log('serializeUser');
	// console.log(user);
	return done(null, user.id.toString());
});

passport.deserializeUser(function(id, done) {
	// console.log('deserializeUser');
	// console.log(id);
	Accounts.users.getById(id)
		.then(function(user) {
			done(null, user);
		}, done);
});

//google

passport.use(new GoogleStrategy({
		clientID: config.google.clientId,
		clientSecret: config.google.clientSecret,
		callbackURL: 'https://' + config.host + '/auth/google/callback'
			//passReqToCallback: true
	},
	function(accessToken, refreshToken, profile, done) {
		// var accessData = {
		// 	accessToken: accessToken,
		// 	refreshToken: refreshToken
		// };
		process.nextTick(function() {
			profile.id = profile.id.toString();
			// console.log('profile', profile);
			Accounts.login('social', profile)
				.then(function(userId) {
					return Accounts.users.getById(userId)
						.then(function(user) {
							return done(null, user);
						})
				}).catch(done);
		});
	}
));

passport.use(new FacebookStrategy({
		clientID: config.facebook.clientId,
		clientSecret: config.facebook.clientSecret,
		callbackURL: 'https://' + config.host + '/auth/facebook/callback',
		enableProof: false
	},
	function(accessToken, refreshToken, profile, done) {
		// var accessData = {
		// 	accessToken: accessToken,
		// 	refreshToken: refreshToken
		// };
		process.nextTick(function() {
			profile.id = profile.id.toString();
			Accounts.login('social', profile)
				.then(function(userId) {
					return Accounts.users.getById(userId)
						.then(function(user) {
							return done(null, user);
						})
				}).catch(done);
		});
	}
));

// passport.use(new GithubStrategy({
//     clientID: config.github.clientId,
//     clientSecret: config.github.clientSecret,
//     callbackURL: 'https://' + config.app.host + '/auth/github/callback',
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     var accessData = {
//       accessToken: accessToken,
//       refreshToken: refreshToken
//     };
//     process.nextTick(function() {
//       profile.id = profile.id.toString();
//       accountsApi.accounts.providerLogin(profile, accessData).then(function(account) {
//         return done(null, account);
//       }).error(done);
//     });
//   }
// ));
