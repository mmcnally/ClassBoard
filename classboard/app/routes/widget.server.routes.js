'use strict';
 
//widget related routes
 
var users = require('../../app/controllers/users.server.controller');
var course = require('../../app/controllers/course.server.controller');
var quiz = require('../../app/controllers/quiz.server.controller');
var attendance = require('../../app/controllers/attendance.server.controller');
 
module.exports = function(app) {
    //quiz widget routes
    app.route('/widget/quiz/create')
        .post(users.requiresLogin, course.requiresAuthorization, quiz.create);
    app.route('/widget/quiz/questions')
        .post(users.requiresLogin, course.requiresAuthorization, quiz.listQuestions)
        .get(users.requiresLogin, quiz.getActiveQuestion);
   
 
   
    //attendance widget routes
    //app.route('/widget/attendance/submit').post(users.requiresLogin, course.requiresAuthorization, attendance.update);
    app.route('/widget/attendance/update').post(users.requiresLogin, attendance.update);
    app.route('/widget/attendance/create').post(users.requiresLogin, course.requiresAuthorization, attendance.create);
    app.route('/widget/attendance/getAttendance').post(users.requiresLogin, attendance.getAttendance);
};
