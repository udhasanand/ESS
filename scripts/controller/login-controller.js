angular.module('ess.LoginController', ['LocalStorageModule', 'ess.userAuthenticationService', 'ess.validatorService'])

.controller("LoginController", function($scope, $location, userAuthentication, customValidator) {

    $scope.customValidate = customValidator.validateField;

    var clearData = function() {

        $scope.userName = '';
        $scope.password = '';
    };

    var invalidateUrl = function () {

        userAuthentication.user.name = '';
    }();

    $scope.userLogin = function () {

        userAuthentication.login($scope.userName, $scope.password);
        clearData();

        if (userAuthentication.user.name === '' || userAuthentication.user.name === undefined) {

            $scope.loginError = 'Please enter correct user name and password';
            return;
        }
        $location.path('/employee');
        $scope.loginError = '';
    };

    $scope.openRegisterWindow = function () {
        $scope.register_window.open().center();
    };
});
