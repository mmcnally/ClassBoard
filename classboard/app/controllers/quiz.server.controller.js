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
  if(!req.body.text) {
    res.status(400).send({message: 'Please fill in question text'});
  }
  else if(!req.body.type) {
    res.status(400).send({message: 'Please fill in the question type'});
  }
  else if(!req.body.answer) {
    res.status(400).send({message: 'Please fill in the correct answer'});
  }
  else {
    question.save(function(err, question) {
      if (err) {
        res.status(400).send(err);
      } 
      else {
        res.status(200).send(question);
      }
    });
  }
};





var closeQuestion = function(questionId) {
  Question.update({_id : questionId}, {completed : true}, function(err, raw) {
    if (err) {
      console.log(err);
    }
  });
};

exports.close = function(req, res) {
  closeQuestion(req.body.questionId);
  res.sendStatus(200);
};

exports.updateStartTime = function(req, res) {
  //var attendance = new Attendance(req.body);
  if(!req.body.questionId) {
    res.status(400).send({
      message: 'questionId is undefined'
    });
  }
  else {
    Question.findOne({_id: req.body.questionId}, function(err, question) {
      if(err) {
        res.status(400).send(err);
      }
      else {
        question.startTime = Date.now();
        question.duration = req.body.duration || question.duration;
        question.save();
        setTimeout(closeQuestion, question.duration * 1000, question._id); 
        res.sendStatus(200);
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
  Question.findOne({course : req.params.courseId, startTime : {$lt : Date.now()}, completed : false}).exec(function(err, question) {
    if (err) {
      console.log(err);
    }
    else {
      if (question) {
        if (question.startTime.getTime() + question.duration * 1000 > Date.now()) {
          question = question.toObject();
          //delete question.answer;
          return res.status(200).send(question);
        }
        else {
          question.completed = true;
          question.save();
          return res.status(400).send('Question duration has run out');
        }
      }
      else {
        return res.status(400).send('No question currently active');
      }
    }
  });
};

// creates answer document
exports.createAnswer = function(req, res) {
  Question.findOne({_id: req.body.question}, function(err, question) {
    if(err) {
      res.status(400).send(err);
    }
    else if(question.completed){
      res.status(400).send({
        message: 'Question is closed'
      });
    }
    else {
      // question exists and is not closed
      var answer = new Answer(req.body);
      answer.user = req.user._id;
      answer.isCorrect = question.answer === answer.text;
      if(answer.isCorrect) {
        question.correctCount++;
      }
      else {
        question.incorrectCount++;
      }
      question.save();
      answer.save(function(err, answer) {
        if(err) {
          res.status(400).send(err);
        }
        else {
          res.status(200).send(answer);
        }
      });
    }
  });
};

exports.getAnswers = function(req, res) {
  Answer.find({question: req.params.questionId}, function(err, answers) {
    if(err) {
      res.status(500).send(err);
    }
    else if(!answers) {
      res.status(400).send({message: 'answers not found'});
    }
    else {
      res.status(200).send(answers);
    }
  });
};

// gets the answer for a student
exports.getAnswer = function(req, res) {
  Answer.findOne({user: req.user, question: req.body._id}, function(err, answer) {
    if(err) {
      res.status(400).send(err);
    }
    else if(!answer) {
      res.status(400).send({message: 'no answer found'});
    }
    else {
      res.status(200).send(answer);
    }
  });
};
