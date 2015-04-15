'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Course = mongoose.model('Course'),
	//User = require('./users.server.controller');
	User = mongoose.model('User');



/******************************************************************************************
 * Class Stuff
 ******************************************************************************************/


exports.signUpClass = function(req, res) {

	// Init Variables
  var randCode = Math.floor(Math.random() * 100000);
	req.body.code = randCode || 12;
	
	
	User.findById(req.body.user._id, function(err, user) {
		if (!err && user) {
					
					// delete user, since we have the real one now
					delete req.body.user;
					
					var course = new Course(req.body)
					console.log(course);
					var message = null;
					
					// add class to user
					if(user.classes && user.classes.length > 0) {
						// user already has some classes
						user.classes = req.body.user.classes.push(course._id);
					}
					else {
						user.classes = [course._id];
					}
					
					
					// Then save the course
					course.save(function(err) {
						if (err) {
							return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						}
					});
					
					
					user.save(function(err) {
						if (err) {
							return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						} else {
							req.login(user, function(err) {
								if (err) {
									res.status(400).send(err);
								} else {
									res.send({
										message: 'Password changed successfully'
									});
								}
							});
						}
					});
		} else {
			res.status(400).send({
				message: 'User is not found'
			});
		}
	});
	
};
	
	
	
	
	
