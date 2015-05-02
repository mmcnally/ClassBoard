'use strict';


angular.module('widgets').directive('widget', ['Authentication', '$state', 'Socket', function(Authentication, $state, Socket) {

	function link($scope, element, attrs) {
		$scope.settings = false;

		$scope.isAdmin = function() {
			var ret = false;
			Authentication.course.admins.forEach(function(adminId) {
				if (adminId === Authentication.user._id) {
					ret = true;
				}
			});
			return ret;
		};

	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/widget.html',
		transclude: true,
		scope: {
			title: '@'
		}
	};
}]);
