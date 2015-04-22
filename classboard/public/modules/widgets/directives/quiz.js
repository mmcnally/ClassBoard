'use strict';

angular.module('widgets').directive('quiz', ['$http', '$state', '$timeout', function($http, $state, $timeout) {

	function link($scope, element, attrs) {
		$scope.creatingQuestion = false;
		$scope.questions = [];
		$scope.QuestionModel = {mcAnswers : [''], mcAnswer : 'Correct Answer', tfAnswer : '', orAnswer: ''};
		$scope.submit = function() {
		  $scope.QuestionModel.error = '';
		  var SubmitModel = {};
		  switch ($scope.QuestionModel.type) {
		    case 'TF':
		      SubmitModel.type = 'TF';
		      SubmitModel.answer = $scope.QuestionModel.tfAnswer;
		      break;
		    case 'MC':
		      SubmitModel.answer = $scope.QuestionModel.mcAnswer;
		      SubmitModel.mcAnswers = $scope.QuestionModel.mcAnswers;
		      SubmitModel.type = 'MC';
		      break;
		    case 'OR':
		      SubmitModel.answer = $scope.QuestionModel.orAnswer;
		      SubmitModel.type = 'OR';
		      break;
		    default:
		      return $scope.QuestionModel.error = 'Must select a type';
		  }

		  SubmitModel.courseId = $state.params._id;
		  SubmitModel.text = $scope.QuestionModel.text;
		  SubmitModel.course = $state.params._id;

		  $http.post('/widget/quiz/create', SubmitModel)
		    .success(function(res) {})
		    .error(function(err) {
		      $scope.QuestionModel.error = err.message;
		    });

		};

		$scope.getLetter = function(num) {
		   var a = 'a'.charCodeAt(0);
		   return String.fromCharCode(a + num);
		};

		$scope.toggle = function() {
			$scope.creatingQuestion = !$scope.creatingQuestion;
		};

		$scope.getQuestions = function() {
			$http.post('/widget/quiz/questions', {courseId: $state.params._id})
			.success(function(res) {
				$scope.questions = res;
		    })
		    .error(function(err) {
		        $scope.QuestionModel.error = err.message;
		    });
		};

		$scope.startQuestion = function(question) {

		};

		$scope.submitToggle = function(){
			$scope.submit();
			$scope.QuestionModel = {mcAnswers : [''], mcAnswer : 'Correct Answer', tfAnswer : '', orAnswer: ''};
			$scope.getQuestions();
			$scope.toggle();
		};

		$scope.getQuestions();
	}

	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/quiz.html',
	};
}]);
