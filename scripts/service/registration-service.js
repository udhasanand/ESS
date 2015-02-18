angular.module('ess.registerService', ['LocalStorageModule'])

.service("registerService", function (localStorageService) {

    var localData = localStorage.getItem("appUsers");
    localData = ((localStorage.getItem('appUsers') !== null) ? JSON.parse(localData) : []);
    localStorage.setItem('appUsers', JSON.stringify(localData));

    this.registerUser = function (success, error, newUser) {

        var message = 'Registration done successfully ....';

        var localStorageData = JSON.parse(localStorage.getItem("appUsers"));

        if (localStorageData === null || localStorageData === undefined) {

            message = 'Bad server error...';
            return error(message);
        }
        localStorageData.push(newUser);
        localStorage.setItem("appUsers", JSON.stringify(localStorageData));
        return success(message);
    };

    this.isUserNameExist = function (userName) {

        var userNameExist = false;
        var localData = JSON.parse(localStorage.getItem("appUsers"));

        for (var index = 0; index < localData.length; index++) {

            if (localData[index].userName === userName) {

                userNameExist = true;
                break;
            }
        }
        return userNameExist;
    };

    this.isEmailExist = function (userEmail) {

        var emailExist = false;
        var localData = JSON.parse(localStorage.getItem("appUsers"));

        for (var index = 0; index < localData.length; index++) {

            if (localData[index].email === userEmail) {

                emailExist = true;
                break;
            }
        }
        return emailExist;
    };
});
