'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Attendance Schema
 */
var ConfusedSchema = new Schema({
	course: { 
		type: Schema.ObjectId,
		ref: 'Course'
	},
	students: {
		type: [Schema.ObjectId],
		ref: 'User',
	},
	endTime: { 
		type: Date,
		default: new Date(Date.now() + 120*1000) // 2 minutes from creation
	},
	current: {
		type: Boolean,
		default: true
	}

});

mongoose.model('Confused', ConfusedSchema);
