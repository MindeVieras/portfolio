'use strict';

angular.module('myApp.contact', [])

.controller('contactCtrl',function($scope, $http) {
	$scope.formData = {};
	$scope.submission = false;
	var param = function(data) {
    	var returnString = '';
    	for (d in data){
    	    if (data.hasOwnProperty(d))
    	       returnString += d + '=' + data[d] + '&';
    	}
		return returnString.slice( 0, returnString.length - 1 );
	};
	$scope.submitForm = function() {
		$http({
			method : 'POST',
			url : '../process.php',
			data : param($scope.formData),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data) {
			if (!data.success) {
   				$scope.errorName = data.errors.name;
   				$scope.errorEmail = data.errors.email;
				$scope.errorTextarea = data.errors.message;
				$scope.submissionMessage = data.messageError;
				$scope.submission = true;
			} else {
				$scope.submissionMessage = data.messageSuccess;
				$scope.formData = {};
				$scope.submission = true;
			}
 		});
	};
});