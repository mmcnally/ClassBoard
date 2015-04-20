'use strict';

/**
 * Module dependencies.
 */
 
var mongoose = require('mongoose'),

    User = mongoose.model('User'),
    Course = mongoose.model('Course'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer');


exports.create = function(req, res) {
    var question = new Question(req.body);
    question.save();
    res.sendStatus(200);
};