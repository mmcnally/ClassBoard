'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.UserInfo = {user: Authentication.user, classes: []};
		if(Authentication.user.classes!==0){
				$http.post('/course/courseNameByID', $scope.UserInfo).success(function(response) {
					$scope.authentication.user.classes.title = response;
					$scope.UserInfo.classes = $scope.authentication.user.classes.title;
					console.log($scope.UserInfo.classes);
				}).error(function(response) {
					$scope.SignUp.error = response.message;
				});
		}

		$scope.logOut = function() {
			$http.get('/auth/signout').success(function(response){
				$scope.authentication.user = null;
				$location.path('/signin');
			});
		};

		$scope.isActive = function(viewLocation) {
    	return viewLocation === $location.path();
		};
	}
]);
