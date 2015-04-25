'use strict';


angular.module('widgets').directive('attendance', ['$http', '$state', 'Authentication', 'Socket',  function($http, $state, Authentication, Socket) {
	

	Socket.on('attend', function(student) {
		console.log(student);
	});

	function link($scope, element, attrs) {
		$scope.user = Authentication.user;
		$scope.clickedAttend = false;
		$scope.AttendanceModel = {
								course: Authentication.course._id,
							 	students: [],
								};
		
		$scope.attend = function() {
			$scope.clickedAttend = true;
			var student = {
				user: $scope.user._id,
				present: 1
			};
			Socket.emit('clicked attend', student);
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
