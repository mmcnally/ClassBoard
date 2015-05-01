'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$location', 'Authentication', '$modal', '$log', '$state',
function($scope, $http, $location, Authentication, $modal, $log, $state) {
	$scope.authentication = Authentication;
	//$scope.teacherName = undefined;
	
	
	
	
	
	
	// $scope.getTeacherName = function() {
	// 	console.log(Authentication);
	// 	console.log(Authentication.course);
	// 	console.log('ID HERE: ' + $state.params._id);
	// 	$http.post('/users/getAdmins', { _id: 12})
	// 	.success(function(admins) {
	// 		console.log(admins);
	// 		console.log('displayName: ' + admins[0].displayName);
	// 		$scope.teacherName = admins[0].displayName;
	// 	}).error(function(err) {
	// 			console.log('FUCKKKKKKKKK');
	// 			console.log(err);
	// 	});
	// 	return $scope.teacherName;
	// };
	// 
	// $scope.getTeacherName();
	
	$scope.logOut = function() {
		$http.get('/auth/signout').success(function(response){
			$scope.authentication.user = null;
			$location.path('/signin');
		});
	};
	
	$scope.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};
	
	/**
	* Modal Stuff
	*/
	
	// Opens a modal window
	$scope.open = function (size, currentUser) {
		
		var modalInstance = $modal.open({
			templateUrl: 'modules/core/views/settings.client.view.html',
			controller: function ($scope, $modalInstance, user) {
				$scope.user = user;
				$scope.SaveAndExit = {};
				
				$scope.ok = function () {
					$http.put('/users/update', $scope.SaveAndExit).success(function(user) {
						Authentication.user = user;
						console.log(user._id);
						
						// change adminName in course
						$http.post('/course/updateAdminName', {courseId: $state.params._id, displayName: user.displayName})
						.success(function(course) {
								Authentication.course = course;
						})
						.error(function (err) {
							console.log(err);
						});
						
						
						
						$modalInstance.close(user);
					}).error(function(err) {
						console.log(err);
						$scope.SaveAndExit.error = err;
					});
				};
				
				
				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			},
			size: size,
			resolve: {
				user: function () {
					return currentUser;
				}
			}
		});
	};
	
}
]);
