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
  var dayStart = new Date();
  dayStart.setHours(0,0,0,0);

  var dayEnd = new Date();
  dayEnd.setHours(23,59,59,999);

  console.log(dayStart);
  console.log(dayEnd);
  // find attendance objects created today for a course, sort them by recency,
  // then select the most recent one and return it with users field populated
  Attendance.find({course : req.body.courseId, courseTime: {$gte: dayStart, $lt: dayEnd}})
  .sort({courseTime: -1}).limit(1).populate('students.user').exec(function(err, attendance) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      console.log(attendance);
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
