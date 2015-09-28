'use strict';

angular.module('widgets').directive('quiz', ['Authentication','$http', '$state', '$timeout', 'Socket', '$modal', '$log', '$interval',
function(Authentication, $http, $state, $timeout, Socket, $modal, $log, $interval) {
	
	function link($scope, element, attrs) {
		$scope.questions = [];
		$scope.activeQuestion = undefined;
		$scope.QuestionModel = {};
		$scope.authentication = Authentication;
		$scope.hasAnswered = false;
		$scope.answer = undefined;
		
		
		Socket.on('question active', function() {
			$scope.hasAnswer = false;
			$scope.answer = undefined;
			$scope.getQuestions();
			$scope.getActiveQuestion();
		});
		Socket.on('close question', function() {
			$scope.getQuestions();
			$scope.getActiveQuestion();
		});
		Socket.on('update question', function() {
			if($scope.isAdmin()) {
				$scope.getActiveQuestion();
			}
		});
		
		
		$scope.getActiveQuestion = function () {
			$http.get('/widget/quiz/questions/' + $state.params._id)
			.success(function(question) {
				if(!$scope.isAdmin()) {
					delete question.answer;
				}
				if(question) {
					$scope.turnOffTimeUpdater();
					$scope.activeQuestion = question;
					$scope.activeQuestion.timeUpdater = $interval($scope.updateRemainingTime, 1000);
					$scope.updateRemainingTime();
					
					
					if(!$scope.isAdmin()) {
						// try to get answer if student
						$http.post('/widget/quiz/getAnswer', question)
						.success(function(answer) {
							// console.log('GOT ANSWER');
							$scope.hasAnswered = true;
							$scope.answer = answer;
						})
						.error(function(err) {
							console.log(err);
						});
					}
				}
			})
			.error(function(err) {
				$scope.turnOffTimeUpdater();
				console.log(err);
			});
		};
		
		
		
		$scope.getActiveQuestion();
		
		
		
		//$scope.getAnswer();
		
		
		
		$scope.updateRemainingTime = function() {
			if ($scope.activeQuestion.remainingTime < 1) {
				$interval.cancel($scope.activeQuestion.timeUpdater);
				$scope.activeQuestion = undefined;
				$scope.hasAnswered = false;
			}
			else {
				var endTimeMs =  (new Date($scope.activeQuestion.startTime)).getTime() + $scope.activeQuestion.duration * 1000;
				$scope.activeQuestion.tR = new Date(0, 0, 0, 0, 0, Math.floor((endTimeMs - Date.now()) / 1000), 0);
				$scope.activeQuestion.remainingTime = Math.floor((endTimeMs - Date.now()) / 1000);
			}
		};
		
		
		$scope.closeQuestion = function() {
			if(!$scope.activeQuestion) {
				console.log('cannot close non-active question');
			}
			else {
				$http.post('/widget/quiz/close',	{questionId: $scope.activeQuestion._id})
				.success(function(res) {
					Socket.emit('question closed');
				})
				.error(function(err) {
					console.log(err);
				});
			}
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
		
		
		$scope.submitAnswer = function() {
			$scope.activeQuestion.error = undefined;
			$http.post('/widget/quiz/answer',
			{
				text: $scope.activeQuestion.answer,
				course: $state.params._id,
				question: $scope.activeQuestion._id
			})
			.success(function(res) {
				$scope.hasAnswered = true;
				Socket.emit('question answered');
				console.log(res);
			})
			.error(function(err) {
				$scope.activeQuestion.error = err;
			});
		};
		
		$scope.turnOffTimeUpdater = function() {
			if($scope.activeQuestion && $scope.activeQuestion.timeUpdater) {
				$interval.cancel($scope.activeQuestion.timeUpdater);
				$scope.activeQuestion = undefined;
				$scope.hasAnswered = false;
				$scope.answer = undefined;
			}
		};
		
		$scope.startQuestion = function(question) {
			$http.post('/widget/quiz/updateStartTime', {courseId: $state.params._id, questionId: question._id, duration: question.duration})
			.success(function(res) {
				Socket.emit('start question');
			})
			.error(function(err) {
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
					$scope.QuestionModel = {mcAnswers : [''], mcAnswer : 'n/a', tfAnswer : '', orAnswer: ''};
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
							$scope.QuestionModel.error = 'Must select a type';
							return;
						}
						
						SubmitModel.courseId = $state.params._id;
						SubmitModel.text = $scope.QuestionModel.text;
						SubmitModel.course = $state.params._id;
						
						$http.post('/widget/quiz/create', SubmitModel)
						.success(function(res) {
							$modalInstance.close(user);
						})
						.error(function(err) {
							console.log(err);
							console.log(err.message);
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
			});
			
		};
		// end of modal
		
		//get questions when element first gets loaded
		$scope.getQuestions();
		element.on('$destroy', function() {
			if ($scope.activeQuestion) {
				$interval.cancel($scope.activeQuestion.timeUpdater);
			}
		});
		
		
		
		
		
		
		
		
		
	}
	return {
		restrict: 'E',
		link: link,
		templateUrl: '/modules/widgets/views/quiz.html',
	};
}]);
