'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket', '$timeout', function($http, $state, Authentication, Socket, $timeout) {
	


	function link($scope, element, attrs) {
		console.log(Authentication.course); // to enroll as student in a class for testing
		$scope.user = Authentication.user;
		$scope.clickedAttend = false;
		$scope.AttendanceModel = {
								course: Authentication.course._id,
							 	students: [],
							 	duration: 300
								};

		$scope.started = false;

		Socket.on('attendance started', function() {
			$scope.started = true;
		});

		$scope.start = function() {
			$scope.started = true;
			Socket.emit('start attendance');
			$scope.presentCount = 0;
			$timeout($scope.submit, $scope.AttendanceModel.duration * 1000); // submits after duration has passed
			Socket.on('attend', function(student) {
				$scope.AttendanceModel.students.push({user: student, present: 1});
				$scope.presentCount += 1;
				Authentication.course.students.forEach(function(id, index, object) { // remove ids as students mark themselves present until only absent are left
					if(id === student) {
						object.splice(index, 1);
					}
				});
			});
		};

		$scope.attend = function() {
			$scope.clickedAttend = true;
			Socket.emit('clicked attend', $scope.user._id);
		};
		
		
		$scope.submit = function() {
			Authentication.course.students.forEach(function(id) { // mark remaining students absent
				console.log(id);
				$scope.AttendanceModel.students.push({user: id, present: 0});
			});
		    var SubmitModel = $scope.AttendanceModel;
		    console.log('submitting with model:');
		    console.log(SubmitModel);
		    SubmitModel.duration = $scope.duration;
		    $http.post('/widget/attendance/submit', SubmitModel)
		    .success(function(res) {
		        
		    })
		    .error(function(err) {
		        $scope.AttendanceError = err;
		    });
		};
	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/attendance.html',
	};
}]);
