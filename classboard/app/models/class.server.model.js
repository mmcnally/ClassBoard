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
var ClassRoomSchema = new Schema({
  className: {
    type: String,
    trim: true,
    required: true,
    validate: [validateNonempty, 'Please fill in the class name']
  },
  schoolId: {
    type: String,
    trim: true,
    required: true,
    validate: [validateNonempty, 'Please fill in the schoolId']
  },
  teachers: [{
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    validate: [validateNonempty, 'Please fill in the teachers']
  }],
  students: [{
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    validate: [validateNonempty, 'Please fill in students']
  }],
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('ClassRoom', ClassRoomSchema);