'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', function($http, $state, Authentication) {
	
	function link($scope, element, attrs) {
		$scope.user = Authentication.user;
		$scope.clickedAttend = false;
<<<<<<< HEAD
		$scope.AttendanceModel = {
								course: Authentication.course._id,
							 	students: [],
								};
=======
		$scope.attendanceDate = Date.now;
		//console.log($scope.attende
		
		//$scope.newAttendance = {course: Authentication.course._id, students: [], courseTime};
>>>>>>> eb310ad276cfb08bce33194c58545c49afaba775
		
		$scope.attend = function() {
			$scope.clickedAttend = true;
			var attended = {
				user: $scope.user._id,
				present: 1
			};
			
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
