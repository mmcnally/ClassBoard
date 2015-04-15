'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		$scope.authentication = Authentication;

		if (!Authentication.user) {
			$location.path('/signin');
<<<<<<< HEAD
		}/*
		else if (Authentication.user.classes.length == 0) {
=======
		}
		else if (Authentication.user.classes && Authentication.user.classes.length === 0) {
>>>>>>> 3be727a399389f3cb84ff662e50f308b2f68cc0c
			$location.path('/setup');
		}*/
	}
]);
