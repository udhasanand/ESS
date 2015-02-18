angular.module('ess.UserController', ['LocalStorageModule', 'ess.userAuthenticationService', 'ess.validatorService'])

.controller("UserController", function ($scope, $location, userAuthentication, customValidator) {

    $scope.userDetails = {};

    $scope.user = userAuthentication.user;
    $scope.customValidate = customValidator.validateField;

    var success = function () {

        showPopup('Updated successfully', 'update alert', 'success.png');
    };

    var error = function () {

        showPopup('Error during upation', 'update alert', 'error.png');
    };

    var clear = function () {

        $scope.userDetails.currentPassword = '';
        $scope.userDetails.newPassword     = '';
        $scope.userDetails.confirmPassword = '';
    };

    var showPopup = function (message, title, icon) {

        $scope.message = message;
        $scope.icon    = icon;

        $scope.alert.title(title);
        $scope.alert.open().center();
    };

    $scope.userAccess = function (path) {

        if ($scope.user.name === undefined || $scope.user.name === "") {

            showPopup('Please login to view this page.', 'security alert', 'login_error.png');
             $location.path('/login');
             return;
        }
        $location.path('/' + path);
    };

    $scope.logout = function () {

        $scope.user.name = '';
        $location.path('/login');
    };

    var checkUserOnRefresh = function () {

        if ($scope.user.name === '' || $scope.user.name === undefined) {
            $location.path('/login');
        }
    }();

    $scope.setAboutData = function () {

        var localData = userAuthentication.getAllUsers();
        var userName  = userAuthentication.user.userName;
        var email     = userAuthentication.user.email;

        angular.forEach(localData, function(key) {

            if(key.userName === userName && key.email === email ) {
                angular.copy(key, $scope.userDetails);
            }
        });
    };

    $scope.updateUserDetails = function () {

        userAuthentication.updateDetails (success, error, $scope.userDetails);
        $scope.user.name = $scope.userDetails.name;
    };

    $scope.matchCurrentPassword = function () {

        $scope.passwordMatch = ($scope.user.password !== $scope.userDetails.currentPassword);
    };

    $scope.changePassword = function () {

        userAuthentication.updatePassword($scope.user.userName, $scope.user.password, $scope.userDetails.newPassword);
        clear();
        showPopup('Password updated successfully Please login again', 'update alert', 'success.png');
        $scope.logout();
    };
});
