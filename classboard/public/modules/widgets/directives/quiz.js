'use strict';

angular.module('widgets').directive('quiz', [ function() {
	
	function link($scope, element, attrs) {
		$scope.QuestionModel = {mcAnswers : [''], mcAnswer : 'Correct Answer', tfAnswer : '', orAnswer: ''};
		
		$scope.submit = function() {
		    
		    $http.post('/widget/quiz/create', $scope.QuestionModel)
		    .success(function(res) {
		        
		    })
		    .error(function(err) {
		        
		    });
		}
		
		$scope.getLetter = function(num) {
		   var a = 'a'.charCodeAt(0);
		   return String.fromCharCode(a + num);
		};
		
	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/quiz.html',
	};
}]);
