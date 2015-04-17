'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		if(Authentication.user.classes!==0){
				$http.post('/course/courseByID', $scope.authentication).success(function(response) {
					// set the global user.classes to the response containing course objects
					$scope.authentication.user.classes = response;
					console.log($scope.authentication.user.classes);
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
		
		
		
		$scope.get_class_id_from_url_for_settings = function() {
			//console.log('path: ' + $location.url().split('/')[2]);
			return 	$location.url().split('/')[2];
		};
	}
]);
