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


	exports.courseByID = function(req, res, next, id) {
		Course.findById(id).exec(function(err, course) {
			if (err) return next(err);
			if (!course) return next(new Error('Failed to load Course ' + id));
			req.profile = course;
			next();
		});
	};

	exports.courseNameByID = function(req, res) {
		User.findById(req.body.user._id, function(err){
			if(!err) {
				console.log('user: ' + User.findById(req.body.user._id));
				var course = Course.findById(req.body.user.classes);
				console.log('current course: ' + course);
				res.send({
					message: 'course'
				});
			} else {
				res.status(400).send({
					message: 'Course is not found'
				});
			}
		});
	};
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

					var course = new Course(req.body);
					console.log(course);
					var message = null;

					// add class to user
					if(user.classes && user.classes.length > 0) {
						// user already has some classes
						user.classes = user.classes.push(course._id);
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


					User.update({_id: user._id}, {
    				classes: user.classes
					}, function(err, numberAffected, rawResponse) {
   					if(err) {
								console.log(err);
						}
					});


					res.json(user);

					// res.status(400).send({
					// 	message: 'New Class Yayy Happiness'
					// });

					//req.user = user;

					// user = _.extend(user, req.body);
					// user.save(function(err) {
					// 	if (err) {
					// 		return res.status(400).send({
					// 			message: errorHandler.getErrorMessage(err)
					// 		});
					// 	}
					// });
					//


					// user.save(function(err) {
					// 	if (err) {
					// 		return res.status(400).send({
					// 			message: errorHandler.getErrorMessage(err)
					// 		});
					// 	} else {
					// 		req.login(user, function(err) {
					// 			if (err) {
					// 				res.status(400).send(err);
					// 			} else {
					// 				res.send({
					// 					message: 'Password changed successfully'
					// 				});
					// 			}
					// 		});
					// 	}
					// });
		} else {
			res.status(400).send({
				message: 'User is not found'
			});
		}
	});

};
