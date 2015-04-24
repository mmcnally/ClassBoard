'use strict';

angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', function($http, $state, Authentication) {
	
	function link($scope, element, attrs) {
		$scope.foo = 'hi';
		$scope.clickedAttend = false;
		//$scope.newAttendance = {course: Authentication.course._id, students: [], };
		
		$scope.attend = function() {
				$scope.clickedAttend = true;			
		}
		
		$scope.createNewAttendance = function() {
				
		}
		
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
