'use strict';

var mongoose = require('mongoose'),
	chalk = require('chalk');

var port = process.env.PORT || 3000; //for c9 set to process.env.PORT

// Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/mean-dev', {user : '', pass : ''}, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
	}
);

// start express server
var app = require('./config/express')(db);

// config passport
require('./config/passport')();

// Start the app by listening on <port>
app.listen(port);

// Expose app
exports = module.exports = app;

console.log(chalk.green('------------------------'));
console.log(chalk.green('Classboard has launched!'));
console.log(chalk.green('------------------------'));
