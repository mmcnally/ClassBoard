'use strict';



module.exports = function(io) {
    io.on('connection', function(socket){

      // Attendance Routes -------------------------------------------
    	socket.on('start attendance', function() {
        // console.log('Attendance started');
    		io.emit('attendance started');
    	});

    	socket.on('clicked attend', function(student) {
    		// console.log('attend event: ' + student);
    		io.emit('attend', student);
    	});

      socket.on('attendance finished', function() {
        io.emit('attendance results');
      });
      
      
      // Quiz Routes -------------------------------------------------
      socket.on('start question', function () {
        io.emit('question active');
      });
      
      socket.on('question answered', function () {
        io.emit('update question');
      });
      
      socket.on('question closed', function () {
        io.emit('close question');        
      });
      
      
      // Confused Routes ---------------------------------------------
      socket.on('confused changed', function () {
        io.emit('update confused');
      });
      
      socket.on('confused reset', function () {
        io.emit('update confused');
      });
      
      
      
      
    });

};
