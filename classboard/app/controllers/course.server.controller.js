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

	// Init Variables
  var randCode = Math.floor(Math.random() * 100000);
	req.body.code = randCode || 12;
	
	var course = new Course(req.body);
	console.log(course);
	var message = null;

	// Then save the course
	course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
			// req.login(course, function(err) {
			// 	if (err) {
			// 		res.status(400).send(err);
			// 	} else {
			// 		res.json(course);
			// 	}
			// });
	});
};
