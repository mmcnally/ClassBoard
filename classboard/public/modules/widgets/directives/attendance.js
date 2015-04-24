'use strict';

angular.module('widgets').directive('attendance', ['$http', '$state', function($http, $state) {
	
	function link($scope, element, attrs) {
		
		$scope.foo = 'oaheoiwefj';
		$scope.submit = function() {
		    
		    $http.post('/widget/attendance/submit')
		    .success(function(res) {
		        
		    })
		    .error(function(err) {
		        
		    });
		};
		

	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/attendance.html',
	};
}]);
