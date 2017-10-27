'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'myApp.skills',
  'myApp.projects'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);