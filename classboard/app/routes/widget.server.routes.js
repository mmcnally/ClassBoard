'use strict';

//widget related routes

var users = require('../../app/controllers/users.server.controller');
var course = require('../../app/controllers/course.server.controller');
var quiz = require('../../app/controllers/quiz.server.controller');

module.exports = function(app) {
    //quiz widget routes
    app.route('/widget/quiz/create')
        .post(users.requiresLogin, course.requiresAuthorization, quiz.create);
    
    
};
