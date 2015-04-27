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


exports.updateStartTime = function(req, res) {
  //var attendance = new Attendance(req.body);
  if(!req.body.questionId) {
    res.status(400).send({
      message: 'questionId is undefined'
    });
  }
  else {
    Question.update({_id: req.body.questionId}, {
      startTime: Date.now()
    }, function(err, raw) {
      if(err) {
        res.status(400).send(err);
      }
    });
  }
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

exports.getActiveQuestion = function(req, res) {
    Question.findOne({course : req.body.courseId, startTime : {$lt : Date.now()}, completed : false}).lean().exec(function(err, question) {
        if (err) {
            console.log(err);
        }
        else {
            if (question) {
                delete question.answer;
                return res.status(200).send(question);
            }
            else {
                return res.status(400).send('No question currently active');
            }
        }
    });
};
