'use strict';

//Defines the main module and its dependencies.
angular.module('ClassBoard', ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'btford.socket-io']);

//start the application
angular.element(document).ready(function() {
	angular.bootstrap(document, ['ClassBoard']);
});

function registerModule(moduleName, dependencies) { //global function allowing to register submodules
	// Create angular module
	angular.module(moduleName, dependencies || []);
	// Add the module to the AngularJS configuration file
	angular.module('ClassBoard').requires.push(moduleName);
};