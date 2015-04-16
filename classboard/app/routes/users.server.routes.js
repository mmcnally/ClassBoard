'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');
	var course = require('../../app/controllers/course.server.controller');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// NEW CLASS ROUTING
	app.route('/course/signUpClass').post(course.signUpClass);
	/*****app.route('/course/courseNameByID').post(course.courseNameByID);*****/
	app.route('/course/courseByID').post(course.courseByID);
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
	// and course middleware
	//app.param('courseId', course.courseByID);
};
