'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket', '$timeout', function($http, $state, Authentication, Socket, $timeout) {
	


	function link($scope, element, attrs) {
		console.log(Authentication.course.code); // enroll as student in a class for debugging
		$scope.user = Authentication.user;
		$scope.clickedAttend = false;
		$scope.AttendanceModel = {
								course: Authentication.course._id,
							 	students: [],
								};

		$scope.duration = 300; // how many seconds students have to click attend. will be set by form data 
		$scope.started = false;

		Socket.on('attendance started', function() {
			$scope.started = true;
		});

		$scope.start = function() {
			$scope.started = true;
			Socket.emit('start attendance');
			$timeout($scope.submit, $scope.duration * 1000); // submits after duration has passed
			Socket.on('attend', function(student) {
				$scope.AttendanceModel.students.push(student);
			});
		};

		$scope.attend = function() {
			$scope.clickedAttend = true;
			var student = {
				user: $scope.user._id,
				present: 1
			};
			Socket.emit('clicked attend', student);
		};
		
		
		$scope.submit = function() {
		    console.log('submitting');
		    $http.post('/widget/attendance/submit')
		    .success(function(res) {
		        
		    })
		    .error(function(err) {
		        
		    });
		};
		

	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/attendance.html',
	};
}]);
