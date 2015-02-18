angular.module('ess.RegisterController', ['ess.registerService', 'ess.userAuthenticationService', 'ess.validatorService'])

.controller("RegisterController", function ($scope, userAuthentication, customValidator, registerService) {

    $scope.newUser = {};

    $scope.customValidate = customValidator.validateField;

    var success = function (message) {

        showPopup(message, 'success.png');
    };

    var error = function (message) {

        showPopup(message, 'error.png');
    };


    var showPopup = function (message, image) {

        $scope.image        = image;
        $scope.alertMessage = message;

        $scope.alert.open().center();
    };

    var clearData = function () {

        $scope.newUser = {};
    };

    $scope.register = function () {

        registerService.registerUser(success, error, $scope.newUser);
        clearData();
        $scope.register_window.close();
    };

    $scope.isUserNameExist = function () {

        $scope.userNameExist = registerService.isUserNameExist($scope.newUser.userName);
    };

    $scope.isEmailExist = function () {

        $scope.userEmailExist = registerService.isEmailExist($scope.newUser.email);
    };
});
