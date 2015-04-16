'use strict';


angular.module('core').controller('DashboardController', ['$scope', '$http', 'Authentication', '$location',
	function($scope, $http, Authentication, $location) {

		if (!Authentication.user) {
			$location.path('/signin');
		}
		else if (Authentication.user.classes && Authentication.user.classes.length === 0) {
			$location.path('/setup');
		}
		
		$scope.user = Authentication.user;

		$http.post('/course/courseByID').success(function(response) {
			$scope.user.classes = response;
		}).error(function(response) {
			$scope.SignUp.error = response.message;
		});
	}
]);