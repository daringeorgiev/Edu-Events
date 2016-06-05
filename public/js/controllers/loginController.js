(function(){
    'use strict';
    app.controller('LoginController', ['$scope', '$location', 'userService',
        function($scope, $location, userService){
            var self = this;

            self.user = userService.getUser();
            $scope.user = userService.getUser();
            self.isUserLoggedIn = function(){
                return self.user && self.user.token != null
            };

            self.onLogoutClick = function(){
                userService.logoutUser();
                $location.path('#');
            };

            self.onLoginClick = function(){
                $location.path('/login');
            };

            self.onRegisterClick = function(){
                $location.path('/register');
            };
    }]);
}());
