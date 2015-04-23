'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http', '$location', 'Authentication', '$modal', '$log',
	function($scope, $http, $location, Authentication, $modal, $log) {
		$scope.authentication = Authentication;

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
