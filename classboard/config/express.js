'use strict';

var express = require('express'),
	http = require('http'),
	socketio = require('socket.io'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')({
		session: session
	}),
	flash = require('connect-flash'),
	consolidate = require('consolidate'),
	path = require('path'),
	assets = require('./assets');
	
var port = process.env.PORT || 3000; //for c9 set to process.env.PORT

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Globbing model files
	assets.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = 'ClassBoard';
	app.locals.description = 'PLACEHOLDER FOR: description of app';
	app.locals.keywords = 'PLACEHOLDER FOR: keywords for search engine optimization';
	app.locals.jsFiles = assets.getJavaScriptAssets();
	app.locals.cssFiles = assets.getCSSAssets();

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate.swig);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Enable morgan logging
	app.use(morgan('combined', {
  		skip: function (req, res) { return res.statusCode < 400; } //only log the errors
	}));

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// CookieParser must be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'supersecretclassboardsecret',
		store: new mongoStore({
			db: db.connection.db,
			collection: 'sessions'
		}),
		cookie: { 
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: null, // cookie never expires
		},
		name: 'classboard.session'
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Globbing routing files
	assets.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// handles errors if they occur
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// sends 404 if no other middleware responds
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});
	
	// config passport
	require('../config/passport')();
	
	var io = require('socket.io').listen(app.listen(port));

	// Globbing socket.io files
	assets.getGlobbedFiles('./app/socket.io/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(io);
	});
	
	// Return Express server instance
	return app;
};
