'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
User = mongoose.model('User'),
Course = mongoose.model('Course'),
Attendance = mongoose.model('Attendance');


// creates attendance object
exports.create = function(req, res) {
  req.body.current = true;
  var attendance = new Attendance(req.body);
  attendance.save(function(err, attendance) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send(attendance);
    }
  });
};



// retrieves attendance object
exports.getAttendance = function(req, res) {
  Attendance.findOne({current : true}).exec(function(err, attendance) {
    if(!err && attendance) {
      res.json(attendance);

    }
    else if(err) {
      res.status(400).send(err);

    }
    else {
      res.status(400).send({
        message: 'Attendance not found'
      });
    }
  });
};


// updates attendance model
// can also be used to submit since that's just more updating
exports.update = function(req, res) {
  Attendance.update({current: true}, {
    students: req.body.students
  }, function(err, raw) {
    if(err) {
      res.status(400).send(err);
    }
  });
};


exports.showAttendance = function(req, res) {
  Attendance.find({course : req.body.courseId}).exec(function(err, attendance) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(attendance);
    }
  });
};
