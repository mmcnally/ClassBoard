'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', '$location',
	function($scope, $http, Authentication, $location) {
		$scope.authentication = Authentication;
		$scope.UserInfo = {user: Authentication.user, classes: []};

		if (!Authentication.user) {
			$location.path('/signin');
		}
		else if (Authentication.user.classes && Authentication.user.classes.length === 0) {
			$location.path('/setup');
		}
		else {
			$http.post('/course/courseNameByID', $scope.UserInfo).success(function(response) {
				$scope.authentication.user.classes.title = response;
				$scope.UserInfo.classes = angular.fromJson($scope.authentication.user.classes.title);
				//console.log($scope.UserInfo.classes.title);
			}).error(function(response) {
				$scope.SignUp.error = response.message;
			});
		}
	}
]);
/*
$scope.courseNameByID = function() {
	$http.post('/course/courseNameByID', $scope.UserInfo).success(function(response) {
		$scope.authentication.user.classes.title = response;
		$scope.UserInfo.classes = angular.fromJson($scope.authentication.user.classes.title);
		console.log($scope.UserInfo.classes.title);
	}).error(function(response) {
		$scope.SignUp.error = response.message;
	});
};*/
