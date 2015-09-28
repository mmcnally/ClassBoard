'use strict';


angular.module('core').controller('DashboardController', ['$scope', '$http', 'Authentication', '$location', '$modal', '$log', '$state',
	function($scope, $http, Authentication, $location, $modal, $log, $state) {

		if (!Authentication.user) {
			$location.path('/signin');
		}
		else if (Authentication.user.classes && Authentication.user.classes.length === 0) {
			$location.path('/setup');
		}

		$scope.user = Authentication.user;


		$scope.showQuiz = true;
		$scope.showAttendance = true;
		$scope.showConfused = true;
		$scope.showWolfram = true;
		$scope.showLibrary = false;

		//checks if user is an admin of the currently view class.
		$scope.isAdmin = function() {
			var ret = false;
			Authentication.user.classes.forEach(function(course) {
				if (course._id === $state.params._id) {
					course.admins.forEach(function(adminId){
						if (adminId === Authentication.user._id) {
							ret = true;
						}
					});
				}
			});
			return ret;
		};

	}
]);
