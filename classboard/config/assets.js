'use strict';

var _ = require('lodash'),
	glob = require('glob');

module.exports.dependencies = { //order matters for these files.
		lib: { //gets read FIRST -- should be used for MODULE files
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [ //these get read SECOND -- used for our files
			'public/modules/**/css/*.css'
		],
		js: [
			'public/application.js', // first application.js to define main module
			'public/modules/*/*.js', //next define each submodule
			'public/modules/**/*.js' // finally submodule js files such as controllers, services etc.
		]
};


/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
	// For context switching
	var _this = this;

	// URL paths regex
	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	// The output array
	var output = [];

	// If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function(globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			glob(globPatterns, {
				sync: true
			}, function(err, files) {
				if (removeRoot) {
					files = files.map(function(file) {
						return file.replace(removeRoot, '');
					});
				}

				output = _.union(output, files);
			});
		}
	}

	return output;
};

module.exports.getJavaScriptAssets = function(includeTests) {
	return this.getGlobbedFiles(this.dependencies.lib.js.concat(this.dependencies.js), 'public/');
};

module.exports.getCSSAssets = function() {
	return this.getGlobbedFiles(this.dependencies.lib.css.concat(this.dependencies.css), 'public/');
};