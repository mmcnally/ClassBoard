'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
User = mongoose.model('User'),
Course = mongoose.model('Course'),
Attendance = mongoose.model('Attendance'),
Confused = mongoose.model('Confused');


// create new confused object
exports.create = function(req, res) {
  var confused = new Confused(req.body);
  confused.save(function(err, confused) {
    if (err) {
      res.status(400).send(err);
    } 
    else {
      res.status(200).send(confused);
    }
  });
};


// updates confused students list
exports.update = function(req, res) {
  Confused.update({course: req.body.course}, {
    students: req.body.students
  }, function(err, raw) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.sendStatus(200);
    }
  });
};



// deletes all confused objects for a course
exports.reset = function(req, res) {
  Confused.remove({course: req.body.course}, function (err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.sendStatus(200);
    }
  });
};



// retrieves confused object
exports.getConfused = function(req, res) {
  Confused.findOne({course: req.body.courseId}).exec(function(err, confused) {
    if(!err && confused) {
      res.json(confused);
    }
    else if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(400).send({
        message: 'Confused not found'
      });
    }
  });
};
