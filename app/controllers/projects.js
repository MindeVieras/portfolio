'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/projects', {
    templateUrl: 'views/projects.html',
    controller: 'projectsCtrl'
  });
}])

.controller('projectsCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('models/projects.json')
	.then(function(response) {
          $scope.projects = response.data;
	})
}]);