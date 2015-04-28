'use strict';


angular.module('widgets').directive('confused', ['$http', '$state', 'Authentication', 'Socket', '$timeout', 
function($http, $state, Authentication, Socket, $timeout) {
	
	
	
	function link($scope, element, attrs) {
		//console.log(Authentication.course);
		$scope.user = Authentication.user;
		$scope.confusedCount = 0;
		$scope.ConfusedModel = undefined;
		$scope.isConfused = false;
		
		$http.post('/widget/confused/getConfused', {courseId: $state.params._id})
		.success(function(confused) {
			console.log('retrieved confused object');
			console.log(confused);
			$scope.ConfusedModel = confused;
			$scope.confusedCount = confused.students.length;
			
			if($scope.ConfusedModel && $scope.ConfusedModel.students.indexOf($scope.user._id) !== -1) {
				// user already clicked confused button
				$scope.isConfused = true;
			}
			
		})
		.error(function(err) {
			console.log(err);
			$scope.ConfusedError = err;
			
			// make new confused model
			$scope.create();
		});
		
		
		
		
		
		
		// update confused when event received
		Socket.on('update confused', function() {
			$http.post('/widget/confused/getConfused', {courseId: $state.params._id})
			.success(function(confused) {
				console.log('retrieved confused object');
				$scope.ConfusedModel = confused;
				$scope.confusedCount = confused.students.length;
			})
			.error(function(err) {
				console.log(err);
				//$scope.ConfusedError = err + '1';
			});
		});
		
		
		// create new confused object
		$scope.create = function () {
			$http.post('/widget/confused/create', {course: Authentication.course._id, students: []})
			.success(function(confused) {
				console.log('confused object created');
				$scope.ConfusedModel = confused;
			})
			.error(function(err) {
				console.log(err);
				//$scope.ConfusedError = err + '2';
			});	
		};
		
		
		// $scope.start = function() {
		// 	var defaultDuration = 30;
		// 	$scope.started = true;
		// 	Socket.emit('start attendance');
		// 	console.log('before starting attendance: ' + $scope.AttendanceModel);
		// 	
		// 	// var StartModel = $scope.AttendanceModel;
		// 	// StartModel.courseId = Authentication.course._id;
		// 	// $http.post('/widget/attendance/create', StartModel)
		// 	// .success(function(res) {
		// 	// 	console.log('start success');
		// 	// });
		// 	
		// 	$scope.presentCount = 0;
		// 	$timeout($scope.submit, ($scope.AttendanceModel.duration || defaultDuration) * 1000); // submits after duration has passed
		// 	Socket.on('attend', function(student) {
		// 		$scope.AttendanceModel.students.push({user: student, present: 1});
		// 		$scope.presentCount += 1;
		// 		$scope.students.forEach(function(id, index, object) { // remove ids as students mark themselves present until only absent are left
		// 			if(id === student) {
		// 				object.splice(index, 1);
		// 			}
		// 		});
		// 	});
		// };
		
		$scope.addConfused = function() {
			if($scope.ConfusedModel.students) {
				$scope.ConfusedModel.students.push($scope.user._id);
			}
			else {
				$scope.ConfusedModel.students = [$scope.user_id];
			}
			
			console.log($scope.ConfusedModel);
			$scope.isConfused = true;
			$http.post('/widget/confused/update', 
			{course: Authentication.course._id, students: $scope.ConfusedModel.students})
			.success(function() {
				console.log('confused object updated');
				
				Socket.emit('confused changed');
			})
			.error(function(err) {
				console.log(err);
				//$scope.ConfusedError = err;
			});	
		};
		
		
		$scope.reset = function () {
			$http.post('/widget/confused/reset', 
			{course: $state.params._id})
			.success(function() {
				console.log('confused objects reset');
				
				// create new confused object
				$scope.create();
			})
			.error(function(err) {
				console.log(err);
				//$scope.ConfusedError = err;
			});				
		};
		
		// $scope.submit = function() {
		// 	console.log(Authentication.course);
		// 	$scope.students.forEach(function(id) { // mark remaining students absent
		// 		$scope.AttendanceModel.students.push({user: id, present: 0});
		// 	});
		// 	$scope.AttendanceModel.current = false;
		// 	$scope.AttendanceModel.courseId = Authentication.course._id;
		// 	var SubmitModel = $scope.AttendanceModel;
		// 	//SubmitModel.courseId = Authentication.course._id;
		// 	$http.post('/widget/attendance/create', SubmitModel)
		// 	.success(function(res) {
		// 		console.log('success');
		// 	})
		// 	.error(function(err) {
		// 		$scope.AttendanceError = err;
		// 	});
		// };
		
		
		
	}
	
	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/confused.html',
	};
}]);
