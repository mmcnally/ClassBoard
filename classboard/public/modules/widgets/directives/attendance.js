'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket', '$timeout', 
function($http, $state, Authentication, Socket, $timeout) {
	
	
	
	function link($scope, element, attrs) {
		//console.log(Authentication.course);
		$scope.user = Authentication.user;
		
		
		$scope.AttendanceModel = {
			course: Authentication.course._id,
			students: []
		};
		
		//$scope.clickedAttend = false;
		console.log('attendance model: ' + $scope.AttendanceModel);
		
		
		//$scope.started = false;
		$scope.students = Authentication.course.students;
		
		Socket.on('attendance started', function() {
			$scope.started = true;
		});
		
		
		$scope.start = function() {
			var defaultDuration = 30;
			$scope.started = true;
			Socket.emit('start attendance');
			console.log('before starting attendance: ' + $scope.AttendanceModel);			
			
			$scope.presentCount = 0;
			$timeout($scope.submit, ($scope.AttendanceModel.duration || defaultDuration) * 1000); // submits after duration has passed
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
			$scope.students.forEach(function(id) { // mark remaining students absent
				$scope.AttendanceModel.students.push({user: id, present: 0});
			});
			$scope.AttendanceModel.current = false;
			$scope.AttendanceModel.courseId = Authentication.course._id;
			var SubmitModel = $scope.AttendanceModel;
			//SubmitModel.courseId = Authentication.course._id;
			$http.post('/widget/attendance/create', SubmitModel)
			.success(function(res) {
				console.log(res);
				$scope.results = res.students;
				Socket.emit('attendance finished');
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
