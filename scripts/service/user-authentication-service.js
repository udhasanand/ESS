angular.module('ess.userAuthenticationService', ['LocalStorageModule'])

.service("userAuthentication", function (localStorageService) {

    this.user = {};

    this.login = function (userName, password) {

        this.appUsers = JSON.parse(localStorage.getItem('appUsers'));

        for (var index = 0; index < this.appUsers.length; index++) {

            if (userName === this.appUsers[index].userName && password === this.appUsers[index].password) {

                this.user.name     = this.appUsers[index].name;
                this.user.userName = this.appUsers[index].userName;
                this.user.email    = this.appUsers[index].email;
                this.user.password = this.appUsers[index].password;
                break;
            }
        }
    };

    this.getAllUsers = function () {

        var localData = JSON.parse(localStorage.getItem("appUsers"));
        return localData;
    };

    this.updateDetails = function (success, error, userNewDetails) {

        var localData = this.getAllUsers();
        var  updateUserIndex = -1;

        for (var index = 0; index < localData.length; index++) {

            if (localData[index].userName === userNewDetails.userName && localData[index].email === userNewDetails.email) {

                updateUserIndex = index;
                break;
            }
        }

        if ( updateUserIndex === -1) {
            return error();
        }
        localData.splice(updateUserIndex, 1, userNewDetails);
        localStorage.setItem("appUsers", JSON.stringify(localData));
        return success();
    };

    this.updatePassword = function (userName, password, newPassword) {

        var localData = this.getAllUsers();

        for (var index = 0; index < localData.length; index++) {

            if (localData[index].userName === userName && localData[index].password === password) {

            localData[index].password = newPassword;
            localStorage.setItem("appUsers", JSON.stringify(localData));
            break;
            }
        }
    };
});
