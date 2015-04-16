'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Courses', ['$http', 'Authentication', '$location',
	function($http, Authentication, $location) {
		
    
    
    
    
    
    
    // creates a class, adds user as admin, and adds class to user's list of classes
    // callback signature: (err, res)
    var createClass = function(CreateClass, cb) {
      $http.post('/course/createClass', CreateClass).success(function(response) {
        // redirect to the index page
        $location.path('/');
      }).error(function(response) {
        cb(response.message, undefined);
      });
      
    };
    
    // enrolls user in class
    // callback signature: (err, res)
    var enroll = function(Enroll, cb) {
      $http.post('/course/enroll', Enroll).success(function(response) {
        // redirect to the index page
        $location.path('/');
      }).error(function(response) {
        cb(response.message, undefined);
      });
    };
    
    
    
    return { 
        createClass: createClass,
        enroll: enroll
    };
    
    
    
	}
]);
