'use strict';

module.exports = function(io) {
    io.on('connection', function(socket){
        socket.emit('an event', { some: 'data' });
    });

};
