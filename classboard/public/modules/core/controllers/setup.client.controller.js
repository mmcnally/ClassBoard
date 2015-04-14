'use strict';


angular.module('core').controller('SetupController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		$scope.authentication = Authentication;
		
    // send user to signin if not logged in
		if (!Authentication.user) {
				$location.path('/signin');
		}
    // send user to normal dashboard if they already have classes
    if (Authentication.user.classes.length === 0) {
        $location.path('/home');
    }
    
    
    
    
	}
]);
