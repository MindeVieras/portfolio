'use strict';

angular.module('myApp.main', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'mainCtrl'
  });
}])
.controller('mainCtrl', ['$scope', function($scope) {
    $scope.email = 'minde@mindelis.com';
    $scope.phone = '07743499249';
    $scope.fblink = false;
}])
.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getDimensions, function (svg) {
            scope.windowHeight = svg.h;
            scope.windowWidth = svg.w;
            scope.centerH = svg.h / 2;
            scope.centerW = svg.w / 2;
            if ((scope.windowHeight*2)>=scope.windowWidth) {
                scope.rCircle = scope.windowWidth / 10;
                scope.middleAlign = 1.3;
            } else {
                scope.rCircle = scope.windowHeight / 5;
                scope.middleAlign = 1.5;
            };
            scope.logoSize = scope.rCircle * 1.7;
            scope.rHalf = scope.rCircle / 2;
            scope.hTriangle = (Math.sqrt(3) * scope.rCircle) / 2;
            scope.styleTitle = function(){
                return{
                    'font-size': (scope.rCircle/2.5) + 'px'
                };
            };
            scope.styleBgImg = function(){
                return{
                    'width': (scope.windowWidth) + 'px',
                    'height': (scope.windowHeight) + 'px'
                };
            };
        }, true);
        w.bind('resize', function () {
            scope.$apply();
        });
    }
})
.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            var bg = angular.element(document.querySelector('.bg-img'));
            var id = element.attr('id');
            element.attr('data-toggle', 'modal');
            element.attr('ng-style', 'styleTitle()');
            element.bind('mouseenter', function(){
                bg.addClass(id+'-bg');
                bg.removeClass('init-bg');
            });
            element.bind('mouseleave', function(){
                bg.removeClass(id+'-bg');
                bg.addClass('init-bg');
            });
            element.removeAttr('region');
            $compile(element)(scope);
        }
    }
}])
// .directive('bgImg', ['$compile', function ($compile) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attrs) {
//             var r = angular.element(document.querySelector('body'));
//             r.addClass('lalalala');
//             element.addClass('bg-img init-bg');
//             element.attr('ng-style', 'styleBgImg()');
//             element.removeAttr('bg-img');
//             $compile(element)(scope);
//         }
    
//     }
// }])
.directive('modalFooter', function () {
    return {
        restrict: 'A',
        template: '<a href="tel:={{phone}}" class="pull-left"><i class="fa fa-mobile"></i><span class="sr-only">Mobile</span>{{phone}}</a><a href="mailto:{{email}}"><i class="fa fa-envelope"></i><span class="sr-only">Email</span>{{email}}</a>',
        link: function (scope, element, attrs) {
            element.attr("class", "modal-footer");
        }
    
    }
});
