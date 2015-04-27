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
 * Question Schema for quiz widget
 */
var QuestionSchema = new Schema({
    course : { // the course this question belongs to
      type: Schema.ObjectId,
      ref: 'Course'
    },
    completed : {
       type: Boolean,
       default : false
    },
    duration : { //number of seconds before question closes
      type: Number,
      default: 120
    },
    startTime : { //time that the quiz question opens
        type: Date,
        default: null
    },
    text : { //the text of the question
        type: String,
        required: true,
        validate: [validateNonempty, 'Please fill in question text']
    },
    type : {
        type: String,
        required: true,
        enum : ['TF', 'MC', 'OR'], // true/false, multiple choice, open response
        validate: [validateNonempty, 'Please fill in the question type']
    },
    mcAnswers: { //possible answers (for multiple choice only)
        type: [String],
    },
    answer: {//either, a b c d e.... for mult choice or 'true' or 'false' or the open response answer: '5.6' or 'Blue'
        type: String,
        validate: [validateNonempty, 'Please fill in the correct answer']
    },
    correctCount: { // number of correct answers submitted by students after question has been opened
        type: Number,
        default: 0
    },
    incorrectCount: {// number of incorrect answers submitted by students after question has been opened
        type: Number,
        default: 0
    }
});

mongoose.model('Question', QuestionSchema);
