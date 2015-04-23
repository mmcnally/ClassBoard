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



		$scope.get_class_id_from_url_for_settings = function() {
			//console.log('path: ' + $location.url().split('/')[2]);
			return 	$location.url().split('/')[2];
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
								$http.put('/users', $scope.SaveAndExit).success(function(user) {
									Authentication.user = user;
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
