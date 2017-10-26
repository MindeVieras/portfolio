'use strict';

angular.module('myApp.projects', [])

.controller('projectsCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('models/projects.json')
	.then(function(response) {
          $scope.projects = response.data;
	})
}]);