'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateNonempty = function(property) {
	if(property) {
		return (property.length);
	}
	return false;
};

/**
 * A Validation function for local strategy password
 */
var validatePassword = function(password) {
	return ((password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: [true, 'Please enter First Name'],
		validate: [validateNonempty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		required: [true, 'Please enter Last Name'],
		validate: [validateNonempty, 'Please fill in your last name']
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Please enter an email'],
		unique: true,
		match: [/.+\@.*.edu/, 'Please fill a valid .edu email']
	},
	password: {
		type: String,
		required: [true, 'Please enter a Password'],
		validate: [validatePassword, 'Password should be longer']
	},
	classes: {
		type: [Schema.ObjectId],
		default: [],
		ref: 'Course'
	},
	salt: {
		type: String
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};


mongoose.model('User', UserSchema);
