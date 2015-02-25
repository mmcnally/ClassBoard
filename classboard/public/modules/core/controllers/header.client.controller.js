'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		
		$scope.logOut = function() {
			$http.get('/auth/signout').success(function(response){
				$scope.authentication.user = null;
				$location.path('/');
			});
		};

	}
]);