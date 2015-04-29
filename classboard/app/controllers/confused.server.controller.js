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
  console.log(req.body);
  console.log('HHHHHHIIIIIIIIIIIIII');
  var confused = new Confused(req.body);
  confused.save(function(err, confused) {
    if (err) {
      console.log('create broke');
      res.status(400).send(err);
    } 
    else {
      console.log('CONFUSED SAVED');
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

//     exec(function(err, confuseds) {
//   if(!err && confuseds) {
//     console.log('confuseds: ' + confuseds);
//     for (var c in confuseds) {
//       console.log(c);
//       c.remove(function (err) {
//         if(err) {
//           console.log('REMOVE ERROR');
//           console.log(err);
//         }
//       });
//     }
//     console.log('reset all confused objects');
//     res.sendStatus(200);
//   }
//   else if(err) {
//     console.log('reset error');
//     res.status(400).send(err);
//   }
//   else {
//     console.log('no confused objects to reset');
//     res.sendStatus(400);
//   }
// });




// retrieves confused object
exports.getConfused = function(req, res) {
  Confused.findOne({course: req.body.courseId}).exec(function(err, confused) {
    // if(confused.length !== 1) {
    //   console.log('number of things!!!! ' + confused.length);
    //   res.status(400).send('too many thangs');
    // }
    if(!err && confused) {
      console.log('FOUND IT YAY');
      console.log(confused);
      res.json(confused);
    }
    else if(err) {
      console.log('O NOES');
      res.status(400).send(err);
    }
    else {
      console.log('CONFUSED TOTALLY NOT HERE :(');
      res.status(400).send({
        message: 'Confused not found'
      });
    }
  });
};
