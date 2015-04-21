'use strict';

angular.module('core').controller('SettingsController', ['$scope', '$http', 'Authentication', '$location', 'Courses',
	function($scope, $http, Authentication, $location, Courses) {
		$scope.authentication = Authentication;

    // send user to signin if not logged in
		if (!Authentication.user) {
				$location.path('/signin');
		}
		
		
		/**
		* Modal Stuff
		*/

				// Opens a modal window
				$scope.open = function (size, currentUser) {

					var modalInstance = $modal.open({
						templateUrl: 'modules/core/views/settings.client.view.html',
						controller: function ($scope, $modalInstance, user) {
							$scope.user = user;

							$scope.ok = function (updatedUser) {
								console.log(updatedUser);
								//$scope.user = updatedUser;
								//console.log(updatedUser.firstName);
								$modalInstance.close($scope.user);
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
