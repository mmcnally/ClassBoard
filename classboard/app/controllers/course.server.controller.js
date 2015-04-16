'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	Course = mongoose.model('Course'),
	User = mongoose.model('User');


/******************************************************************************************
 * Class Stuff
 ******************************************************************************************/

/* Called when user creates class
 * 1. Creates new course in database
 * 2. Adds current user as admin of new course
 * 3. Adds course to current user's list of courses
 */
exports.createClass = function(req, res) {

	// Init Variables
  var randCode = Math.floor(Math.random() * 100000) + 10000;
	req.body.code = randCode || 12;
	var user = req.user;
	
	// create new course
	var course = new Course(req.body);
	
	// print course for debugging purposes
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


	// save the course
	course.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});

	// add course to current user
	User.update({_id: user._id}, {
		classes: user.classes
	}, function(err, numberAffected, rawResponse) {
			if(err) {
				console.log(err);
		}
	});

	// send user back
	res.json(user);
};





exports.enroll = function(req, res) {
	
	var user = req.user;	
			
	// delete user in request, since we have the real one now
	var message = null;
	if(!req.body.title || !req.body.code) {
		res.status(400).send({
			message: 'All fields are required'
			//message: errorHandler.getErrorMessage(err)
		});
	}
	else {
		Course.findOne({code : req.body.code}).exec(function(err, course) {
			if (!err && course) {
				
				// add class to user's list of classes
				if(user.classes && req.user.classes.length > 0) {
					// user already has some classes
					user.classes = user.classes.push(course._id);
				}
				else {
					user.classes = [course._id];
				}
				
			
				// save the user
				User.update({_id: user._id}, {
					classes: user.classes
				}, function(err, numberAffected, rawResponse) {
						if(err) {
							console.log(err);
					}
				});
				
				
				// add student to class's list of classes
				if(course.students && course.students.length > 0) {
					// course already has students
					course.students = course.students.push(user._id);
				}
				else {
					course.students = [user._id];
				}
				
				
				// save the course
				Course.update({_id: course._id}, {
					students: course.students
				}, function(err, numberAffected, rawResponse) {
						if(err) {
							console.log(err);
					}
				});
				
				res.json(user);
			}
			else {
				return res.status(400).send({
					message: 'Course not Found'
					//message: errorHandler.getErrorMessage(err)
				});
			}
		});
	}
};







//Find courses by their ID

exports.courseByID = function(req, res) {
	Course.populate(req.user, 'classes', function (err, user) {
		if(!err && user){
			// respond with the Course objects for a user
			res.json(user.classes);
		} else {
			res.status(400).send({
				message: 'User is not found'
				});
			}
	});
};
