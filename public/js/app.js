var app = angular.module('eventApp',['ngRoute'])

.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider){
        'use strict';
        $routeProvider
            .when('/',{
                templateUrl: 'partials/test.html',
                reloadOnSearch: false
            })
            .when('/register', {
                template: '<div>register</div>',
                reloadOnSearch: false
            })
            .when('/edit-event', {
                template: '<div>edit event</div>',
                reloadOnSearch: false
            })
            .when('/view-events', {
                template: '<div>view events</div>',
                reloadOnSearch: false
            })
            .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
}]);