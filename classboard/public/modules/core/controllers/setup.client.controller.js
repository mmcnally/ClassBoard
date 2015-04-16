'use strict';


angular.module('core').controller('SetupController', ['$scope', '$http', 'Authentication', '$location',
	function($scope, $http, Authentication, $location) {
		$scope.authentication = Authentication;
		
    // send user to signin if not logged in
		if (!Authentication.user) {
				$location.path('/signin');
		}
		
		
		$scope.Enroll = {};
		$scope.CreateClass = {admins: [Authentication.user._id], students: [], user: Authentication.user};
	
	
		// creates a class, adds user as admin, and adds class to user's list of classes
		$scope.createClass = function() {
			$http.post('/course/createClass', $scope.CreateClass).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.CreateClass.error = response.message;
			});
		};
		
		
		
	}
]);
