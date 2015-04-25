'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket', '$timeout', function($http, $state, Authentication, Socket, $timeout) {
	


	function link($scope, element, attrs) {
		console.log(Authentication.course);
		$scope.user = Authentication.user;
		$scope.clickedAttend = false;
		$scope.AttendanceModel = {
								course: Authentication.course._id,
							 	students: []
								};

		$scope.started = false;
		$scope.students = Authentication.course.students;
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
				$scope.students.forEach(function(id, index, object) { // remove ids as students mark themselves present until only absent are left
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
			console.log(Authentication.course);
			$scope.students.forEach(function(id) { // mark remaining students absent
				$scope.AttendanceModel.students.push({user: id, present: 0});
			});
		    var SubmitModel = $scope.AttendanceModel;
		    SubmitModel.courseId = Authentication.course._id;
		    $http.post('/widget/attendance/submit', SubmitModel)
		    .success(function(res) {
		    	console.log('success');
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
