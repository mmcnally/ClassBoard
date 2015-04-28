'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
User = mongoose.model('User'),
Course = mongoose.model('Course'),
Attendance = mongoose.model('Attendance'),
Confused = mongoose.model('Confused');


exports.create = function(req, res) {
  console.log(req.body);
  var confused = new Confused(req.body);
  confused.save(function(err, confused) {
    if (err) {
      res.status(400).send(err);
    } 
    else {
      console.log('CONFUSED SAVED');
      res.status(200).send(confused);
    }
  });
};
// 
// 
// // retrieves attendance object
// exports.getAttendance = function(req, res) {
//   Attendance.findOne({current : true}).exec(function(err, attendance) {
//     if(!err && attendance) {
//       console.log('FOUND THE COURSE YAY');
//       console.log(attendance);
//       res.json(attendance);
//       
//     }
//     else if(err) {
//       console.log('O NOES');
//       res.status(400).send(err);
//       
//     }
//     else {
//       console.log('ATTENDANCE TOTALLY NOT HERE :(');
//       res.status(400).send({
//         message: 'Attendance not found'
//       });
//     }
//   });
// };
// 
// 
// // updates attendance model
// // can also be used to submit since that's just more updating
// exports.update = function(req, res) {
//   //var attendance = new Attendance(req.body);
//   Attendance.update({current: true}, {
//     students: req.body.students
//   }, function(err, raw) {
//     if(err) {
//       res.status(400).send(err);
//     }
//   });
// };
// 
// 
// 
// 
// 
// exports.showAttendance = function(req, res) {
//   Attendance.find({course : req.body.courseId}).exec(function(err, attendance) {
//     if (err) {
//       res.status(500).send(err);
//     }
//     else {
//       res.status(200).send(attendance);
//     }
//   });
// };
