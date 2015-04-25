'use strict';

angular.module('widgets').directive('widget', ['Authentication', '$state', 'Socket', function(Authentication, $state, Socket) {

	function link($scope, element, attrs) {
		$scope.toggleSettings = function(title) {
			$scope.settings = !$scope.settings;
			if ($scope.settings){
				$('widget[title="'+title+'"]')[0].setAttribute('class','widgSettings');
				$('button[title="'+title+'"]')[0].setAttribute('class','pull-right btn btn-xs btn-info glyphicon glyphicon-ok widgSettingsBtnSettings');
			}
			else{
				$('widget[title="'+title+'"]')[0].setAttribute('class','widgDefault');
				$('button[title="'+title+'"]')[0].setAttribute('class','pull-right btn btn-xs btn-info glyphicon glyphicon-cog widgSettingsBtnDefault');
			}
		};
		$scope.settings = false;

		$scope.isAdmin = function() {
			var ret = false;
			Authentication.user.classes.forEach(function(course) {
				if (course._id === $state.params._id) {
					course.admins.forEach(function(adminId){
						if (adminId === Authentication.user._id) {
							ret = true;
						}	
					});
				}
			});
			return ret;
		};


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
