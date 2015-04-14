'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Course = mongoose.model('Course');



/******************************************************************************************
 * Class Stuff
 ******************************************************************************************/


exports.signUpClass = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	//delete req.body.roles;

	// Init Variables
  console.log('hi there');
  var randCode = Math.floor(Math.random() * 100000);
	req.body.code = randCode || 12;
	
	var course = new Course(req.body);
	console.log(course);
	var message = null;

	// Add missing course fields
  //	course.displayName = course.firstName + ' ' + course.lastName;

	// Then save the course
	course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			// course.password = undefined;
			// course.salt = undefined;

			req.login(course, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(course);
				}
			});
		}
	});
};
