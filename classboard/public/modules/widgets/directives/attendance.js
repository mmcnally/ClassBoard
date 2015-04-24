'use strict';

angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', function($http, $state, Authentication) {
	
	function link($scope, element, attrs) {
		$scope.foo = 'hi';
		$scope.clickedAttend = false;
		$scope.attendanceDate = Date.now;
		//console.log($scope.attende
		
		$scope.newAttendance = {course: Authentication.course._id, students: [], courseTime};
		
		$scope.attend = function() {
				$scope.clickedAttend = true;			
		};
		
		$scope.createNewAttendance = function() {
				
		};
		
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
