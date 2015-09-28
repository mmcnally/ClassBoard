'use strict';
 
//widget related routes
 
var users = require('../../app/controllers/users.server.controller');
var course = require('../../app/controllers/course.server.controller');
var quiz = require('../../app/controllers/quiz.server.controller');
var attendance = require('../../app/controllers/attendance.server.controller');
var confused = require('../../app/controllers/confused.server.controller');

 
module.exports = function(app) {
    //quiz widget routes
    app.route('/widget/quiz/create')
        .post(users.requiresLogin, course.requiresAuthorization, quiz.create);
    app.route('/widget/quiz/questions')
        .post(users.requiresLogin, course.requiresAuthorization, quiz.listQuestions);
    app.route('/widget/quiz/questions/:courseId')
        .get(users.requiresLogin, quiz.getActiveQuestion);
    app.route('/widget/quiz/updateStartTime')
            .post(users.requiresLogin, course.requiresAuthorization, quiz.updateStartTime);
    //-------
    app.route('/widget/quiz/answer').post(users.requiresLogin, quiz.createAnswer);
    app.route('/widget/quiz/getAnswer').post(users.requiresLogin, quiz.getAnswer);
    app.route('/widget/quiz/getAnswers:questionId').get(users.requiresLogin, quiz.getAnswers);
    app.route('/widget/quiz/close').post(users.requiresLogin, quiz.close);
   
   
    //attendance widget routes
    //app.route('/widget/attendance/submit').post(users.requiresLogin, course.requiresAuthorization, attendance.update);
    // app.route('/widget/attendance/update').post(users.requiresLogin, attendance.update);
    app.route('/widget/attendance/create').post(users.requiresLogin, attendance.create);
    app.route('/widget/attendance/getAttendance').post(users.requiresLogin, attendance.getAttendance);
    
    // Confused widget routes
    app.route('/widget/confused/create').post(users.requiresLogin, confused.create);
    app.route('/widget/confused/update').post(users.requiresLogin, confused.update);
    app.route('/widget/confused/reset').post(users.requiresLogin, confused.reset);
    app.route('/widget/confused/getConfused').post(users.requiresLogin, confused.getConfused);
};
