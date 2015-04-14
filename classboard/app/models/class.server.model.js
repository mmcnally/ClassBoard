'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	



/**
 * ClassRoom Schema
 */
var ClassRoomSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    validate: [validateNonempty, 'Please fill in the class name']
  },
  teachers: {
    type: [Schema.ObjectId],
    ref: 'User',
    required: true,
    validate: [validateNonempty, 'Please fill in the teachers']
  },
  students: {
    type: [Schema.ObjectId],
    ref: 'User',
    required: true,
    validate: [validateNonempty, 'Please fill in students']
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('Class', ClassRoomSchema);
