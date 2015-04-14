'use strict';


angular.module('core').controller('SetupController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		$scope.authentication = Authentication;
		
    // send user to signin if not logged in
		if (!Authentication.user) {
				$location.path('/signin');
		}
	}
]);
