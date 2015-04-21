'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Answer Schema for quiz widget answers
 */
var AnswerSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    question : { //the question the answer belongs to
        type: Schema.ObjectId,
        ref: 'Question',
        required: true
    },
    course : { //for convenience when querying we also store a ref to the course
        type: Schema.ObjectId,
        ref: 'Course'
    },
    text: {//either, a b c d e.... for mult choice or 'true' or 'false' or the open response answer: '5.6' or 'Blue'
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean
    }
});

mongoose.model('Answer', AnswerSchema);
