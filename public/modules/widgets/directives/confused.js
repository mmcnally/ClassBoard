'use strict';


angular.module('widgets').directive('confused', ['$http', '$state', 'Authentication', 'Socket', '$timeout',
function($http, $state, Authentication, Socket, $timeout) {



	function link($scope, element, attrs) {
		$scope.user = Authentication.user;
		$scope.confusedCount = 0;
		$scope.ConfusedModel = undefined;
		$scope.isConfused = false;
		$scope.confusedPercent = 0;

		$http.post('/widget/confused/getConfused', {courseId: $state.params._id})
		.success(function(confused) {
			$scope.ConfusedModel = confused;
			if(!confused.students) {
				$scope.confusedCount = 0;
			}
			else {
				$scope.confusedCount = confused.students.length;

				$scope.updatePercent();
			}

			if($scope.ConfusedModel && $scope.ConfusedModel.students && $scope.ConfusedModel.students.indexOf($scope.user._id) !== -1) {
				// user already clicked confused button
				$scope.isConfused = true;
			}
		})
		.error(function(err) {
			// make new confused model
			$scope.create();
		});


		// update confused when event received
		Socket.on('update confused', function() {
			$http.post('/widget/confused/getConfused', {courseId: $state.params._id})
			.success(function(confused) {
				$scope.ConfusedModel = confused;
				if(!confused.students) {
					$scope.confusedCount = 0;
					$scope.confusedPercent = 0;
				}
				else {
					$scope.confusedCount = confused.students.length;

					$scope.updatePercent();

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
			});
		});


		$scope.updatePercent = function () {
			if(Authentication.course.students.length === 0) {
				$scope.confusedPercent = 0;
			}
			else {
				$scope.confusedPercent = $scope.confusedCount / Authentication.course.students.length;
			}
		};

		$scope.getColor = function(){
			var baseNum;
			if($scope.confusedPercent === 0){
				baseNum = 0;
				return('rgb(' + 63 + ',' + 182 + ',' + 24 + ')');
			}else{
				baseNum = ($scope.confusedPercent * 100) - 1;
			}
			var r, g, b = 0;
			if(baseNum < 50){
				r = Math.floor(255 * (baseNum / 35));
				g = 200;
			} else{
				r = 255
				g = Math.floor(255 * ((40-baseNum%50) / 50));
			}
			b = 0;
			return('rgb(' + r + ',' + g + ',' + b + ')');
		};

		$scope.confusedCountIsOne = function () {
			return $scope.confusedCount && $scope.confusedCount === 1;
		};


		// create new confused object
		$scope.create = function () {
			$http.post('/widget/confused/create', {course: Authentication.course._id, students: []})
			.success(function(confused) {
				Socket.emit('confused changed');
			})
			.error(function(err) {
				console.log(err);
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
