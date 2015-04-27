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