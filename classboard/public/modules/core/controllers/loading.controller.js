'use strict';

angular.module('core').controller('LoadingController', ['$scope', '$http', '$state', 'Authentication',
	function($scope, $http, $state, Authentication) {
	    
	    $http.post('/course/courseByID', Authentication)
	    .success(function(response) {
			Authentication.user.classes = response;
			console.log(Authentication.user.classes);
			$state.go('course', {_id : $state.params._id || response[0]._id});
		})
		.error(function(response) {
			console.log(response);
		});
	    
	    
	    
	}
]);
