'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	config = require('../../config/assets'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto');

/*********************************************************************************
 *	Profile Stuff
 *********************************************************************************/

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

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
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};



/******************************************************************************************
 * Password Stuff
 ******************************************************************************************/
var smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function(req, res, next) {
	async.waterfall([
		// Generate random token
		function(done) {
			crypto.randomBytes(20, function(err, buffer) {
				var token = buffer.toString('hex');
				done(err, token);
			});
		},
		// Lookup user by email
		function(token, done) {
			if (req.body.email) {
				User.findOne({
					email: req.body.email
				}, '-salt -password', function(err, user) {
					if (!user) {
						return res.status(400).send({
							message: 'No account with that email address has been found'
						});
					} else {
						user.resetPasswordToken = token;
						user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

						user.save(function(err) {
							done(err, token, user);
						});
					}
				});
			} else {
				return res.status(400).send({
					message: 'Email address field must not be blank'
				});
			}
		},
		function(token, user, done) {
			res.render('reset-password-email', {
				name: user.displayName,
				appName: config.appName,
				url: 'http://' + req.headers.host + '/auth/reset/' + token
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},
		// If valid email, send reset email using service
		function(emailHTML, user, done) {
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Password Reset',
				html: emailHTML
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				if (!err) {
					res.send({
						message: 'An email has been sent to ' + user.email + ' with further instructions.'
					});
				} else {
					return res.status(400).send({
						message: 'Failure sending email'
					});
				}

				done(err);
			});
		}
	], function(err) {
		if (err) return next(err);
	});
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function(req, res) {
	User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	}, function(err, user) {
		if (!user) {
			return res.redirect('/#/password/reset/invalid');
		}
		res.redirect('/#/password/reset/' + req.params.token);
	});
};

/**
 * Reset password POST from email token
 */
exports.reset = function(req, res, next) {
	// Init Variables
	var passwordDetails = req.body;

	async.waterfall([

		function(done) {
			User.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
					$gt: Date.now()
				}
			}, function(err, user) {
				if (!err && user) {
					if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
						user.password = passwordDetails.newPassword;
						user.resetPasswordToken = undefined;
						user.resetPasswordExpires = undefined;

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
										// Return authenticated user
										res.json(user);

										done(err, user);
									}
								});
							}
						});
					} else {
						return res.status(400).send({
							message: 'Passwords do not match'
						});
					}
				} else {
					return res.status(400).send({
						message: 'Password reset token is invalid or has expired.'
					});
				}
			});
		},
		function(user, done) {
			res.render('reset-password-confirm-email', {
				name: user.displayName,
				appName: config.appName
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},
		// If valid email, send reset email using service
		function(emailHTML, user, done) {
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Your password has been changed',
				html: emailHTML
			};

			smtpTransport.sendMail(mailOptions, function(err) {
				done(err, 'done');
			});
		}
	], function(err) {
		if (err) return next(err);
	});
};

/**
 * Change Password
 */
exports.changePassword = function(req, res) {
	// Init Variables
	var passwordDetails = req.body;

	if (req.user) {
		if (passwordDetails.newPassword) {
			User.findById(req.user.id, function(err, user) {
				if (!err && user) {
					if (user.authenticate(passwordDetails.currentPassword)) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

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
								message: 'Passwords do not match'
							});
						}
					} else {
						res.status(400).send({
							message: 'Current password is incorrect'
						});
					}
				} else {
					res.status(400).send({
						message: 'User is not found'
					});
				}
			});
		} else {
			res.status(400).send({
				message: 'Please provide a new password'
			});
		}
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};





/******************************************************************************************
 * Authorization Stuff
 ******************************************************************************************/



/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findById(id, function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};


/******************************************************************************************
 * Authentication Stuff
 ******************************************************************************************/



/**
 * Signup
 */
exports.signup = function(req, res) {

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.displayName = user.firstName + ' ' + user.lastName;

	// Then save the user
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
