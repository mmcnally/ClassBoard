'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket', '$timeout',
function($http, $state, Authentication, Socket, $timeout) {

	function link($scope, element, attrs) {
		$scope.user = Authentication.user;

		$scope.AttendanceModel = {
			course: Authentication.course._id,
			students: []
		};

		$scope.students = Authentication.course.students;

		Socket.on('attendance started', function() {
			$scope.started = true;
		});

		Socket.on('attendance results', function() {
			$scope.finished = true;
		});


		$scope.start = function() {
			var defaultDuration = 30;
			$scope.started = true;
			Socket.emit('start attendance');

			$scope.presentCount = 0;
			$scope.studentCount = Authentication.course.students.length;
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
			$scope.AttendanceModel.courseId = Authentication.course._id;
			var SubmitModel = $scope.AttendanceModel;
			
			$http.post('/widget/attendance/create', SubmitModel)
			.success(function(res) {
				Socket.emit('attendance finished');
				$http.post('/widget/attendance/getAttendance', {courseId: res.course})
				.success(function(res) {
					$scope.finished = true;
					$scope.results = res[0].students;
					console.log($scope.results);
				})
				.error(function(err) {
					console.log(err);
				});
			})
			.error(function(err) {
				console.log(err);
			});
		};


	}
	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/attendance.html',
	};
}]);
