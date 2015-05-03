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
  Attendance.findOne({course : req.body.courseId}).populate('students.user').exec(function(err, attendance) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(attendance);
    }
  });
};

// updates attendance model
// can also be used to submit since that's just more updating
// exports.update = function(req, res) {
//   Attendance.update({current: true}, {
//     students: req.body.students
//   }, function(err, raw) {
//     if(err) {
//       res.status(400).send(err);
//     }
//   });
// };
