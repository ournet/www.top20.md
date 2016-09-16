'use strict';

var express = require('express');
var passport = require('../passport');

var route = module.exports = express.Router();

//auth0

route.get('/login', function(req, res) {
	res.locals.site.title = 'Login | ' + res.locals.site.title;
	res.render('login');
});

// GET /auth/auth0
route.get('/auth/auth0',
	passport.authenticate('auth0', {}));

// GET /auth/auth0/callback
route.get('/auth/auth0/callback',
	passport.authenticate('auth0', {
		failureRedirect: '/login'
	}),
	function(req, res) {
		res.redirect('/');
	});

route.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// route.use(function(req, res, next) {
// 	if (!req.isAuthenticated()) // && !req.path.match(/^\/(login|logout|auth)/))
// 		return res.redirect('/login');
// 	next();
// });
