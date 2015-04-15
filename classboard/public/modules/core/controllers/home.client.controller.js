'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication', '$location',
	function($scope, $http, Authentication, $location) {
		$scope.authentication = Authentication;
		$scope.UserInfo = {user: Authentication.user};

		if (!Authentication.user) {
			$location.path('/signin');
		}
		else if (Authentication.user.classes && Authentication.user.classes.length === 0) {
			$location.path('/setup');
		}
		$scope.courseNameByID = function() {
			$http.post('/course/courseNameByID', $scope.UserInfo).success(function(response) {
				console.log('we did it!');
			}).error(function(response) {
				console.log('we didnt do it :(');
				$scope.SignUp.error = response.message;
			});
		};
	}
]);
