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
	req.body.adminName = req.user.displayName;
	var user = req.user;

	// create new course
	var course = new Course(req.body);



	var message = null;

	// add class to user
	if(user.classes && user.classes.length > 0) {
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

	res.json(course);
};




/* Called when user enrolls in class
* 1. Adds current user to list of students in class
* 2. Adds course to current user's list of courses
*/
exports.enroll = function(req, res) {

	var user = req.user;

	// delete user in request, since we have the real one now
	var message = null;
	if(!req.body.title || !req.body.code) {
		res.status(400).send({
			message: 'All fields are required'
		});
	}
	else {
		Course.findOne({code : req.body.code}).exec(function(err, course) {
			if (!err && course) {

				// add class to user's list of classes
				if(user.classes && req.user.classes.length > 0) {
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



				// add student to class's list of students
				if(course.students && course.students.length > 0) {
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

				res.json(course);
			}
			else {
				return res.status(400).send({
					message: 'Course not Found'
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

//authorization middleware that requires a user to be a course admin in order to perform an action
exports.requiresAuthorization = function(req, res, next) {
	Course.findOne({_id : req.body.courseId}).exec(function(err, course) {
		if (err) {
			res.status(500).send('Server error');
		}
		else if (!course) {
			res.status(400).send('Unable to find course');
		}
		else {
			var isAdmin = false;
			course.admins.forEach(function(admin){
				if (admin.toString() === req.user._id.toString()) {
					isAdmin = true;
				}
			});
			if (isAdmin) {
				next();
			}
			else {
				res.status(401).send('You must be a course admin to do this');
			}
		}
	});
};




// finds course and populates admins
// returns populated admins
exports.getAdmins = function(req, res) {

	Course.findOne({_id: req.body._id}).populate('admins').exec(function (err, course){
		if(err) {
			res.status(400).send(err);
		}
		else if(!course) {
			res.status(400).send({ message: 'no course' });
		}
		else {
			res.status(200).send(course.admins);
		}
	});
};


// updates admin name when user's name is changed in settings
exports.updateAdminName = function(req, res) {
	var user = req.user;
	Course.findOne({_id: req.body.courseId}, function(err, course) {
		if(err) {
			res.status(400).send(err);
		}
		else if(!course) {
			res.status(400).send({message: 'No course found'});
		}
		else if(course.admins[0].toString() !== user._id.toString()) {
			res.status(400).send({message: 'user not admin of course'});
		}
		else {
			course.adminName = user.displayName;
			course.save();
			res.status(200).send(course);
		}
	});
};
