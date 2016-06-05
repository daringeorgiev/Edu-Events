(function() {
    'use strict';
    app.controller('UserController', ['$scope', '$window', '$location', 'userService',
        function ($scope, $window, $location, userService) {
            var self = this;
            var minUserNameLength = 1,
                minPasswordLength = 1;

            self.user = userService.getUser();
            self.isRegisterFormVisible = false;

            self.onLoginClick = function () {
                if (self.user.userName && self.user.userName.length >= minUserNameLength &&
                    self.user.password && self.user.password.length >= minPasswordLength) {
                    userService.loginUser(self.user.userName, self.user.password)
                        .then(function successCallback(res) {

                            userService.setUser(res.data);
                            $location.path('#');
                            //TODO Add bootstrap notify
                            //notify({message: 'Login successful'});
                        }, function errorCallback(res) {
                            $location.path('#');
                            userService.logoutUser();
                            //TODO Add bootstrap notify
                            //notify({message: 'Error: ' + res.data.message});
                        });
                } else {
                    //TODO Add bootstrap notify
                    //notify({message: 'Error: Please check your user name and password'});
                }
            };

            self.sendRegisterForm = function () {
                if (self.user.userName && self.user.userName.length >= minUserNameLength &&
                    self.user.password && self.user.password.length >= minPasswordLength) {
                    userService.registerUser(self.user.userName, self.user.password, self.user.email, self.user.school, self.user.schoolAddress)
                        .then(function successCallback(res) {
                            $location.path('#');
                            userService.setUser(res.data);
                            //TODO Add bootstrap notify
                            //notify({message: 'Registration successful'});
                        }, function errorCallback(res) {
                            $location.path('#');
                            userService.logoutUser();
                            //TODO Add bootstrap notify
                            //notify({message: 'Error: ' + res.data.message});
                        });
                } else {
                    //TODO Add bootstrap notify
                    //notify({message: 'Error: Please check your user name and password'});
                }
            };

            self.onLogoutClick = function () {
                $location.path('#');
                userService.logoutUser();
                //TODO Add bootstrap notify
                //notify({message: 'Logout successful'});
            };
        }]);
}());