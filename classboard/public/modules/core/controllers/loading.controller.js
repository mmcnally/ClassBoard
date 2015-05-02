'use strict';

angular.module('core').controller('LoadingController', ['$scope', '$http', '$state', 'Authentication', '$location',
	function($scope, $http, $state, Authentication, $location) {

			if (!Authentication.user) {
				$location.path('/signin');
			}
			else {

		    $http.post('/course/courseByID', Authentication)
		    .success(function(response) {
				Authentication.user.classes = response;


				if (Authentication.user.classes && Authentication.user.classes.length === 0) {
					$state.go('setup');
				}
				else {
					Authentication.user.classes.forEach(function(course) {
						if (course._id === $state.params._id) {
							Authentication.course = course;
						}
					});
					$state.go('course', {_id : $state.params._id || response[0]._id});
			  	}

			})
			.error(function(response) {
				console.log(response);
			});

			}



	}
]);
