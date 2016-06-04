var app = angular.module('eventApp',['ngRoute'])

.config(['$routeProvider',function($routeProvider){
        'use strict';
    $routeProvider
        .when('/',{
            reloadOnSearch: false
        })
        .when('/register', {
            template: '<div>register</div>',
            controller: '',
            reloadOnSearch: false
        })
        .when('/edit-event', {
            template: '<div>edit event</div>',
            controller: '',
            reloadOnSearch: false
        })
        .when('/view-events', {
            template: '<div>view events</div>',
            controller: '',
            reloadOnSearch: false
        })
        .otherwise({redirectTo: '/'})
}]);