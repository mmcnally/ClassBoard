var port = process.env.PORT || 3000;
var io = require('socket.io')(port);

var quiz = io.of('/widget/quiz/io').on('connection', function(socket) {
    
});

var attendance = io.of('/widget/attendance/io').on('connection', function(socket) {

});