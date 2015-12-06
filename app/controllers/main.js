'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'mainCtrl'
  });
}])

.controller('mainCtrl', [function() {
	console.log('konsoles pranesimas');
}]);