'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket', '$timeout', 
function($http, $state, Authentication, Socket, $timeout) {
	
	
	
	function link($scope, element, attrs) {
		//console.log(Authentication.course);
		$scope.user = Authentication.user;
		
		// $http.post('/widget/attendance/getAttendance', undefined)
		// .success(function(attendance) {
		// 	console.log('got dat data');
		// 	$scope.AttendanceModel = attendance;
		// 	$scope.started = true;
		// 	$scope.presentCount = attendance.students.length;
		// })
		// .error(function(err) {
		// 	console.log('no attendance or things done broke');
		// 	$scope.AttendanceError = err;
		// 	// make new attendance model
		// 	$scope.AttendanceModel = {
		// 		course: Authentication.course._id,
		// 		students: []
		// 	};
		// 	$scope.presentCount = 0;
		// });
		
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
			$scope.started = true;
			Socket.emit('start attendance');
			console.log('before starting attendance: ' + $scope.AttendanceModel);
			
			// var StartModel = $scope.AttendanceModel;
			// StartModel.courseId = Authentication.course._id;
			// $http.post('/widget/attendance/create', StartModel)
			// .success(function(res) {
			// 	console.log('start success');
			// });
			
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
			
			// $http.post('/widget/attendance/update', SubmitModel)
			// .success(function(res) {
			// 	console.log('success');
			// })
			// .error(function(err) {
			// 	$scope.AttendanceError = err;
			// });
			
		};
		
		
		$scope.submit = function() {
			console.log(Authentication.course);
			$scope.students.forEach(function(id) { // mark remaining students absent
				$scope.AttendanceModel.students.push({user: id, present: 0});
			});
			$scope.AttendanceModel.current = false;
			$scope.AttendanceModel.courseId = Authentication.course._id;
			var SubmitModel = $scope.AttendanceModel;
			//SubmitModel.courseId = Authentication.course._id;
			$http.post('/widget/attendance/create', SubmitModel)
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
