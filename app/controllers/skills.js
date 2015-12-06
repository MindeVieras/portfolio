'use strict';

angular.module('myApp.skills', ['ngRoute', 'angular-svg-round-progress'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/skills', {
    templateUrl: 'views/skills.html',
    controller: 'skillsCtrl'
  });
}])

.controller('skillsCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('models/skills.json')
	.then(function(response) {
          $scope.devskills = response.data.development;
		  $scope.perskills = response.data.personal;
	})
    $scope.getStyle = function(){
		var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
		return {
			'top': $scope.isSemi ? 'auto' : '50%',
			'bottom': $scope.isSemi ? '5%' : 'auto',
			'left': '50%',
			'transform': transform,
			'-moz-transform': transform,
			'-webkit-transform': transform,
			'font-size': $scope.radius/3.5 + 'px'
		};
	};
}]);