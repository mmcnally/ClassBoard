'use strict';


angular.module('core').controller('SetupController', ['$scope', '$http', 'Authentication', '$location',
	function($scope, $http, Authentication, $location) {
		$scope.authentication = Authentication;
		
    // send user to signin if not logged in
		if (!Authentication.user) {
				$location.path('/signin');
		}
		
		
		$scope.SignUp = {};
		$scope.CreateClass = {admins: [Authentication.user._id], students: []};
	
	
		$scope.signUpClass = function() {
			$http.post('/course/signUpClass', $scope.CreateClass).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.SignUp.error = response.message;
			});
		};
	}
]);
