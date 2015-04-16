'use strict';

angular.module('widgets').directive('widget', [function() {
	
	function link($scope, element, attrs) {
		$scope.settings = false;
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