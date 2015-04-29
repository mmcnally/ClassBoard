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
			if(!confused.students) {
				$scope.confusedCount = 0;
			}
			else {
				$scope.confusedCount = confused.students.length;
			}
			
			if($scope.ConfusedModel && $scope.ConfusedModel.students && $scope.ConfusedModel.students.indexOf($scope.user._id) !== -1) {
				// user already clicked confused button
				$scope.isConfused = true;
			}
		})
		.error(function(err) {
			console.log(err);
			//$scope.ConfusedError = err;
			
			// make new confused model
			$scope.create();
		});
		
	
		
		
		
		// update confused when event received
		Socket.on('update confused', function() {
			console.log('received update confused message');
			$http.post('/widget/confused/getConfused', {courseId: $state.params._id})
			.success(function(confused) {
				console.log('retrieved confused object');
				console.log(confused);
				$scope.ConfusedModel = confused;
				if(!confused.students) {
					$scope.confusedCount = 0;
				}
				else {
					$scope.confusedCount = confused.students.length;
					if(confused.students.indexOf($scope.user._id) !== -1) {
						$scope.isConfused = true;
					}
					else {
						$scope.isConfused = false;
					}
				}
			})
			.error(function(err) {
				console.log(err);
				//$scope.ConfusedError = err + '1';
			});
		});
		
		
		$scope.confusedCountIsOne = function () {
			return $scope.confusedCount && $scope.confusedCount === 1;
		}
		
		
		// create new confused object
		$scope.create = function () {
			$http.post('/widget/confused/create', {course: Authentication.course._id, students: []})
			.success(function(confused) {
				console.log('confused object created');
				//$scope.ConfusedModel = confused;
				
				Socket.emit('confused changed');
			})
			.error(function(err) {
				console.log(err);
				//$scope.ConfusedError = err + '2';
			});	
		};
		
		
		
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
			{course: Authentication.course._id})
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
		
		
	}
	
	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/confused.html',
	};
}]);
