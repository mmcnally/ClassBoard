'use strict';


angular.module('core').controller('SetupController', ['$scope', '$http', 'Authentication', '$location', 'Courses',
	function($scope, $http, Authentication, $location, Courses) {
		$scope.authentication = Authentication;

    // send user to signin if not logged in
		if (!Authentication.user) {
				$location.path('/signin');
		}


		$scope.Enroll = {};
		$scope.CreateClass = {admins: [Authentication.user._id], students: []};



		//call thing in courses service
		$scope.createClass = function() {
			Courses.createClass($scope.CreateClass, function (err, res) {
				if(err) {
					$scope.CreateClass.error = err;
				}
			});
		};

		$scope.enroll = function() {
			Courses.enroll($scope.Enroll, function (err, res) {
				if(err) {
					$scope.Enroll.error = err;
				}
			});
		};


	}
]);
