'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		$scope.authentication = Authentication;

		if (!Authentication.user) {
			$location.path('/signin');
		}
		else if (Authentication.user.classes && Authentication.user.classes.length === 0) {
			$location.path('/setup');
		}
	}
]);
