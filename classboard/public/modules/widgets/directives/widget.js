'use strict';

angular.module('widgets').directive('widget', ['Authentication', '$state', function(Authentication, $state) {

	function link($scope, element, attrs) {
		$scope.toggleSettings = function() {
			$scope.settings = !$scope.settings;
			//widgetElement.setAttribute('class','widgSettings');
		};
		$scope.settings = false;

		$scope.isAdmin = function() {
			var ret = false;
			Authentication.user.classes.forEach(function(course) {
				if (course._id === $state.params._id) {
					course.admins.forEach(function(adminId){
						if (adminId === Authentication.user._id) {
							ret = true;
						}
					});
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
