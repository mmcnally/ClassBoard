'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket', '$timeout', function($http, $state, Authentication, Socket, $timeout) {
	


	function link($scope, element, attrs) {
		console.log(Authentication.course.code); // to enroll as student in a class for testing
		$scope.user = Authentication.user;
		$scope.course = Authentication.course;
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
			$scope.presentCount = 0;
			console.log($scope.duration);
			$timeout($scope.submit, $scope.duration * 1000); // submits after duration has passed
			Socket.on('attend', function(student) {
				$scope.AttendanceModel.students.push(student);
				$scope.presentCount += 1;
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
			//Find students that are in course but not in present
			// var absent = Authentication.course.students.filter(function(studentsid) {
			//     return !$scope.AttendanceModel.students.user.some(function(presentid) {
			//         return studentsid.value == presentid.value;
			//     });
			// });

		    console.log('submitting');
		    var SubmitModel = $scope.AttendanceModel;
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
