'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Attendance Schema
 */
var AttendanceSchema = new Schema({
	course: { // Which course is taking attendance
		type: Schema.ObjectId,
		ref: 'Course'
	},
	students: [{
		_id: false,
		user: {type: Schema.ObjectId, ref: 'User'},
		present: {type: Number, enum: [0, 1]}
	}],
	courseTime: { // The time the course starts at
		type: Date
	},
	duration: { // How long students have to mark themselves present
		type: Number,
		default: 300
	},
	current: {
		type: Boolean,
		default: true
	}

});

mongoose.model('Attendance', AttendanceSchema);
