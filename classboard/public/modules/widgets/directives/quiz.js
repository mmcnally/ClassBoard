'use strict';

angular.module('widgets').directive('quiz', ['Authentication','$http', '$state', '$timeout', 'Socket', '$modal', '$log',
function(Authentication, $http, $state, $timeout, Socket, $modal, $log) {

	function link($scope, element, attrs) {
		$scope.questions = [];
		$scope.activeQuestion = undefined;

		Socket.on('question active', function() {
			//console.log('IF ADMIN IT SHOULD BE TRUE: ' + isAdmin());
			$http.get('/widget/quiz/questions/' + $state.params._id)
			.success(function(question) {
				$scope.activeQuestion = question;
				console.log($scope.activeQuestion);
			})
			.error(function(err) {
				console.log(err);
			});



		});

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
			$http.post('/widget/quiz/updateStartTime', {courseId: $state.params._id, questionId: question._id})
			.success(function(res) {
				console.log('CLIENT SENDS START QUESTION');
				Socket.emit('start question');
			})
			.error(function(err) {
				console.log('ERRRRRRRRROORRRRR');
				$scope.QuestionModel.error = err.message;
			});
		};

			/**
			* Modal Stuff
			*/

			// Opens a modal window
			$scope.open = function (size, element, attrs,currentUser) {
				var modalInstance = $modal.open({
					templateUrl: 'modules/widgets/views/newQuestion.client.view.html',
					controller: function ($scope, $modalInstance, user) {
						$scope.user = user;
						$scope.SaveAndExit = {};

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
						
						$scope.submitToggle = function(){
							$scope.submit();
							$scope.QuestionModel = {mcAnswers : [''], mcAnswer : 'Correct Answer', tfAnswer : '', orAnswer: ''};
							//$scope.getQuestions();
							//$scope.toggle();
							$modalInstance.close(user);
						};
					},
					size: size,
					resolve: {
						user: function () {
							return currentUser;
						}
					}
				});

				modalInstance.result.then(function(res) {
					$scope.getQuestions();
				}, function() {
					console.log('modal dismissed');
				});

			};
// modal end

		$scope.getQuestions();
	}
	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/quiz.html',
	};
}]);
