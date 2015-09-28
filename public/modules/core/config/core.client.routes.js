'use strict';

// Setting up route
angular.module('core', ['ngAnimate']).config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to dashboard view when route not found
		$urlRouterProvider.otherwise('/signin');

		// Home state routing
		$stateProvider.
		state('dashboard', {
			url: '/',
			controller: 'LoadingController',
			templateUrl: 'modules/core/views/loading.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('setup', {
			url: '/setup',
			templateUrl: 'modules/core/views/setup.client.view.html'
		}).
		state('forgotpass', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('course', {
			url: '/course/:_id',
			controller: 'LoadingController',
			templateUrl: 'modules/core/views/dashboard.client.view.html'
		}).
		state('settings', {
			url: '/course/settings/:_id',
			templateUrl: 'modules/core/views/settings.client.view.html'
		}).
		state('test', {
			url: '/test',
			templateUrl: 'modules/core/views/test.client.view.html'
		});

	}
]);
