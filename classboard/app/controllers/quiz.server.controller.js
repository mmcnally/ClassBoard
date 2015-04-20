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
    question.save(function(err, question) {
       if (err) {
           res.status(400).send(err);
       } 
       else {
           res.status(200).send(question);
       }
    });
};

exports.listQuestions = function(req, res) {
    Question.find({course : req.body.courseId, startTime : null}).exec(function(err, questions) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(questions);
        }
    });
};