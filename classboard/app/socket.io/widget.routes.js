'use strict';



module.exports = function(io) {
    io.on('connection', function(socket){
    	console.log('socket server received connection');

      // Attendance Routes -------------------------------------------
    	socket.on('start attendance', function() {
        console.log('Attendance started');
        // MAKE OBJECT
    		io.emit('attendance started');
    	});

    	socket.on('clicked attend', function(student) {
        // ADD STUDENT
    		console.log('attend event: ' + student);
    		io.emit('attend', student);
    	});
      socket.on('disconnect', function(stuff) {
        console.log('PLEASE PRINT THINGS');
        //console.log(stuff);
      });
      
      
      // Quiz Routes -------------------------------------------------
      socket.on('start question', function () {
        console.log('SERVER RECEIVED QUESTION, EMITTED THINGS');
        io.emit('question active');
      });
      
      
      // Confused Routes ---------------------------------------------
      socket.on('confused changed', function () {
        console.log('server received confused changed message');
        io.emit('update confused');
      });
      
      socket.on('confused reset', function () {
        console.log('server received confused reset message');
        io.emit('update confused');
      }
      
      
      
      
    });

};
