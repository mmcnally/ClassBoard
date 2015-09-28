'use strict';

var mongoose = require('mongoose'),
	chalk = require('chalk');

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

// Expose app
exports = module.exports = app;

console.log(chalk.green('------------------------'));
console.log(chalk.green('Classboard has launched!'));
console.log(chalk.green('------------------------'));
