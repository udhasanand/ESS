angular.module('ess.employeeProfileService', ['LocalStorageModule'])

.service("employeeProfileService", function (localStorageService, $http) {

    var skills       = [];
    var languages    = [];
    var certificates = [];

    var localData = localStorage.getItem("EmployeeProfile");
    localData = ((localStorage.getItem('EmployeeProfile') !== null) ? JSON.parse(localData) : []);
    localStorage.setItem('EmployeeProfile', JSON.stringify(localData));

    var employeeProfilePicLocalData = localStorage.getItem("EmployeeProfilePic");
    employeeProfilePicLocalData = ((localStorage.getItem('EmployeeProfilePic') !== null) ? JSON.parse(employeeProfilePicLocalData) : []);
    localStorage.setItem('EmployeeProfilePic', JSON.stringify(employeeProfilePicLocalData));

    $http.get('scripts/json files/skill-data.json').success(function (response) {

        skills = response.skill;
        languages = response.language;
        certificates = response.certificates;
    });


    this.getEmployeeBesicDetails = function () {

        var localData = JSON.parse(localStorage.getItem("Employees"));

        if (localData === null || localData === undefined) {
            return error();
        }
        var employeeBesicInformation = [];

        angular.forEach(localData, function (element) {

            employeeBesicInformation.push({
                id:          element.id,
                name:        element.name,
                email:       element.email,
                company:     element.company,
                designation: element.designation,
            });
        });
        return employeeBesicInformation;
    };

    this.getEmployeeProfileDetails = function () {

        var localData = JSON.parse(localStorage.getItem("EmployeeProfile"));
        return localData;
    };

    this.getNames = function (error) {
        var employeeBesicInformation = this.getEmployeeBesicDetails();
        var names = [];

        angular.forEach(employeeBesicInformation, function (element) {

            names.push(element.name + " (emp id " + element.id + ")");
        });
        return names;
    };

    this.updateEmployeeProfile = function (employeeProfileDetails) {

        var localData = JSON.parse(localStorage.getItem("EmployeeProfile"));

        for (var index = 0; index < localData.length; index++) {

            if (localData[index].id === employeeProfileDetails.id) {
                updateDetails(index, employeeProfileDetails, localData);
                return;
            }
        }
        localData.push(employeeProfileDetails);
        localStorage.setItem('EmployeeProfile', JSON.stringify(localData));

    };

    this.undoUpdateEmployee = function (employeeId) {

        var localData = JSON.parse(localStorage.getItem("EmployeeProfile"));
        var returnData;
        angular.forEach(localData, function (element) {

            if (element.id === employeeId) {
                returnData =  element;
            }
        });
        return returnData;
    };

    var updateDetails = function (index, employeeProfileDetails, localData) {

        localData.splice(index, 1, employeeProfileDetails);
        localStorage.setItem('EmployeeProfile', JSON.stringify(localData));
    };

    this.setEmployeeProfilePic = function (employeeId, imageUrl) {

        var employeeProfilePicLocalData = JSON.parse(localStorage.getItem("EmployeeProfilePic"));

        var newValue = {
            id: employeeId,
            Url: imageUrl
        };

        for (var index = 0; index < employeeProfilePicLocalData.length; index++) {

            if (employeeProfilePicLocalData[index].id === employeeId) {

                updateEmployeeProfilePic(index, newValue, employeeProfilePicLocalData);
                return;
            }
        }
        employeeProfilePicLocalData.push(newValue);
        localStorage.setItem('EmployeeProfilePic', JSON.stringify(employeeProfilePicLocalData));
    };

    var updateEmployeeProfilePic = function (index, newValue, employeeProfilePicLocalData) {

        employeeProfilePicLocalData.splice(index, 1, newValue);
        localStorage.setItem('EmployeeProfilePic', JSON.stringify(employeeProfilePicLocalData));
    };

    this.getEmployeeProfilePic = function (employeeId) {

        var employeeProfilePicLocalData = JSON.parse(localStorage.getItem("EmployeeProfilePic"));
        var url = './images/profilepic.png';

        angular.forEach(employeeProfilePicLocalData, function (element) {

            if (element.id === employeeId) {
                url = element.Url ;
            }
        });
        return url;
    };

    this.getSkills = function () {

        return skills;
    };

    this.getLanguages = function () {

        return languages;
    };

    this.getCertificates = function () {

        return certificates;
    };
});
