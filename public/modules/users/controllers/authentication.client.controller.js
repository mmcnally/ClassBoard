'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.SignIn = {};
		$scope.SignUp = {};

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.SignUp).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.SignUp.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.SignIn).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.SignIn.error = response.message;
			});
		};
	}
]);
