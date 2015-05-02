'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
User = mongoose.model('User'),
Course = mongoose.model('Course'),
Attendance = mongoose.model('Attendance');



exports.create = function(req, res) {
  console.log(req.body);
  req.body.current = true;
  var attendance = new Attendance(req.body);
  attendance.save(function(err, attendance) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      console.log('ATTENDANCE WAS SAVED!!! REJOICE');
      res.status(200).send(attendance);
    }
  });
};

//
// exports.submit = function(req, res) {
//   console.log(req.body);
//   req.body.current = true;
//   var attendance = new Attendance(req.body);
//   attendance.save(function(err, attendance) {
//     if (err) {
//       res.status(400).send(err);
//     }
//     else {
//       res.status(200).send(attendance);
//     }
//   });
// };

// retrieves attendance object
exports.getAttendance = function(req, res) {
  Attendance.findOne({current : true}).exec(function(err, attendance) {
    if(!err && attendance) {
      console.log('FOUND THE COURSE YAY');
      console.log(attendance);
      res.json(attendance);

    }
    else if(err) {
      console.log('O NOES');
      res.status(400).send(err);

    }
    else {
      console.log('ATTENDANCE TOTALLY NOT HERE :(');
      res.status(400).send({
        message: 'Attendance not found'
      });
    }
  });
};


// updates attendance model
// can also be used to submit since that's just more updating
exports.update = function(req, res) {
  //var attendance = new Attendance(req.body);
  Attendance.update({current: true}, {
    students: req.body.students
  }, function(err, raw) {
    if(err) {
      res.status(400).send(err);
    }
  });

  // Attendance.findOne({current : true}).exec(function(err, attendance) {
  //   if (!err && attendance) {
  //
  //
  //     if(req.body.students.length > 0) {
  //       // make students array if it doesn't exist yet
  //       if(!attendance.students) {
  //         attendance.students = [];
  //       }
  //       // add new students to list of students
  //       for(var s in req.body.students) {
  //         if(attendance.students.indexOf(s) === -1)  {
  //           attendance.students.push(s);
  //         }
  //       }
  //
  //
  //       // update attendance
  //       Attendance.update({current: true}, {
  //         students: attendance.students
  //       }, function(err, raw) {
  //         if(err) {
  //           res.status(400).send(err);
  //         }
  //       });
  //
  //       res.json(attendance);
  //     }
  //
  //
  //   }
  //   else {
  //     return res.status(400).send({
  //       message: 'Attendance not Found'
  //     });
  //   }
  // });
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
