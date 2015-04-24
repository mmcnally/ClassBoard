'use strict';

/**
 * Module dependencies.
 */
 
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Course = mongoose.model('Course'),
	  Attendance = mongoose.model('Attendance');
    
    
    
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

  
exports.attend = function(req, res) {
  
  var user = req.user;
  
  // create new course
  //var course = new Course(req.body);
  
  // print course for debugging purposes
  //console.log(course);
  //var message = null;

  // add class to user
  //if(user.classes && user.classes.length > 0) {
    //user.classes = user.classes.push(course._id);
  //}
  //else {
  //  user.classes = [course._id];
  //}
  
  var thing = {};
  // add course to current user
  Attendance.update({_id: user._id}, {
    classes: user.classes
  }, function(err, numberAffected, rawResponse) {
      if(err) {
        console.log(err);
    }
  });


  // // save the course
  // course.save(function(err) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   }
  // });

  // add course to current user
  User.update({_id: user._id}, {
    classes: user.classes
  }, function(err, numberAffected, rawResponse) {
      if(err) {
        console.log(err);
    }
  });

  // send user back
  
  res.json(thing);
};
  
