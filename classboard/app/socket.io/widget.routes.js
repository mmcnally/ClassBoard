'use strict';

module.exports = function(io) {
    io.on('connection', function(socket){
    	console.log('socket server received connection');

    	socket.on('start attendance', function() {
    		io.emit('attendance started');
    	});

    	socket.on('clicked attend', function(student) {
    		console.log('attend event');
    		console.log(student);
    		io.emit('attend', student);
    	});
    });

};