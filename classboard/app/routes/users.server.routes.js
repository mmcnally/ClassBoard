'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');
	var course = require('../../app/controllers/course.server.controller');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users/update').put(users.update);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);


	// Course routes
	app.route('/course/createClass').post(users.requiresLogin, course.createClass);
	app.route('/course/enroll').post(users.requiresLogin, course.enroll);
	app.route('/course/courseByID').post(course.courseByID);
	app.route('/course/getAdmins').post(course.getAdmins);
	app.route('/course/updateAdminName').post(course.updateAdminName);
	
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
