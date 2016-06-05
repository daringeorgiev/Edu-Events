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
                controller: 'UserController as userCtrl',
                reloadOnSearch: false
            })
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'UserController as userCtrl',
                reloadOnSearch: false
            })
            .when('/register-event', {
                templateUrl: 'partials/register-event.html',
                reloadOnSearch: false
            })
            .when('/view-events', {
                templateUrl: 'partials/view-events.html',
                controller: 'EventController as eventCtrl',
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
