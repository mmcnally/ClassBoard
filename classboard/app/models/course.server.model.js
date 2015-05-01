'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



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
 * ClassRoom Schema
 */
var CourseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    validate: [validateNonempty, 'Please fill in the class name']
  },
  admins: {
    type: [Schema.ObjectId],
    ref: 'User',
    required: true,
    validate: [validateNonempty, 'Please fill in the teachers']
  },
	adminName: {
		type: String,
		required: true,
		validate: [validateNonempty, 'Please fill in the teacher name']
	},
  students: {
    type: [Schema.ObjectId],
    ref: 'User',
  },
	code: {
		type: Number,
		required: true,
		validate: [validateNonempty, 'retreat immediately, hell froze over']
	},
  capacity: {
    type: Number
  },
  widgets: {
    type: [String],
    default: ['Attendance', 'Quiz', 'Confused']
  },
  created: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('Course', CourseSchema);
