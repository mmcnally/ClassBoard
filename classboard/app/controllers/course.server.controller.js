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

/*
	exports.courseByID = function(req, res, next, id) {
		Course.findById(id).exec(function(err, course) {
			if (err) return next(err);
			if (!course) return next(new Error('Failed to load Course ' + id));
			req.profile = course;
			next();
		});
	};*/


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
  var randCode = Math.floor(Math.random() * 100000);
	req.body.code = randCode || 12;


	// find current user
	User.findById(req.body.user._id, function(err, user) {
		if (!err && user) {

					// delete user in request, since we have the real one now
					delete req.body.user;

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
		} else {
			res.status(400).send({
				message: 'User is not found'
			});
		}
	});

};

//Find courses by their ID

exports.courseByID = function(req, res) {
	User.findById(req.body.user._id, function(err, user){
		if(!err && user){
			// if the user is found, populate the classes field with Course objects
			Course.populate(user, {path: 'classes', model: 'Course'}, function (err, user) {
				if(!err && user){
					// respond with the Course objects for a user
					res.json(user.classes);
				} else {
					res.status(400).send({
						message: 'User is not found'
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
