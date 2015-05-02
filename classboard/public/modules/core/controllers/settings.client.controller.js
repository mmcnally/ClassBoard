'use strict';

angular.module('core').controller('SettingsController', ['$scope', '$http', 'Authentication', '$location', 'Courses',
	function($scope, $http, Authentication, $location, Courses) {
		$scope.authentication = Authentication;

    // send user to signin if not logged in
		if (!Authentication.user) {
				$location.path('/signin');
		}




	}
]);
