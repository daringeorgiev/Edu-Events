var app = angular.module('eventApp',['ngRoute'])

.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider){
        'use strict';
        $routeProvider
            .when('/',{
                templateUrl: 'partials/home.html',
                controller: 'HomePageController as homeCtr',
                reloadOnSearch: false
            })
            .when('/register', {
                templateUrl: 'partials/register.html',
                reloadOnSearch: false
            })
            .when('/register-event', {
                templateUrl: 'partials/register-event.html',
                reloadOnSearch: false
            })
            .when('/view-events', {
                templateUrl: 'partials/view-events.html',
                reloadOnSearch: false
            })
            .when('/about', {
                templateUrl: 'partials/about.html',
                reloadOnSearch: false
            })
            .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
}]);