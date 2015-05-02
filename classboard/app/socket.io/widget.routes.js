'use strict';



module.exports = function(io) {
    io.on('connection', function(socket){
    	console.log('socket server received connection');

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

      // socket.on('disconnect', function(stuff) {
      //   console.log('PLEASE PRINT THINGS');
      // });
      
      
      // Quiz Routes -------------------------------------------------
      socket.on('start question', function () {
        console.log('SERVER RECEIVED QUESTION, EMITTED THINGS');
        io.emit('question active');
      });
      
      socket.on('question answered', function () {
        console.log('server received question answered, emitted update question');
        io.emit('update question');
      });
      
      socket.on('question closed', function () {
        console.log('server received question closed, emitted update question');
        io.emit('close question');        
      });
      
      
      // Confused Routes ---------------------------------------------
      socket.on('confused changed', function () {
        console.log('server received confused changed message');
        io.emit('update confused');
      });
      
      socket.on('confused reset', function () {
        console.log('server received confused reset message');
        io.emit('update confused');
      });
      
      
      
      
    });

};
