angular.module('ess.employeeService', ['LocalStorageModule'])

.service("employeeService", function (localStorageService) {

    this.addEmployee = function (success, error, newEmployee) {

        var localData = JSON.parse(localStorage.getItem("Employees"));

        if (localData === null || localData === undefined) {
            return error();
        }
        localData.push(newEmployee);
        localStorage.setItem("Employees", JSON.stringify(localData));
        return success ();
    };

    this.deleteEmployee = function (success, error, index) {

        var localData = JSON.parse(localStorage.getItem("Employees"));

        if (localData === null || localData === undefined) {
            return error();
        }
        localData.splice(index, 1);
        localStorage.setItem("Employees", JSON.stringify(localData));
        return success();
    };

    this.updateEmployee = function (success, error, index, updateEmployee) {

        var localData = JSON.parse(localStorage.getItem("Employees"));

        if (localData === null || localData === undefined) {
            return error();
        }
        localData.splice(index, 1, updateEmployee);
        localStorage.setItem("Employees", JSON.stringify(localData));
        return success();
    };

    this.getCompanies = function () {

        var companys = JSON.parse(localStorage.getItem("Companies"));
        var companyNames = [];

        angular.forEach(companys, function (element) {

            companyNames.push(element.name);
        });

        var uniqueCompanyNames = companyNames.filter(function (element, position) {
            return companyNames.indexOf(element) == position;
        });
        return uniqueCompanyNames;
    };

    this.read = function () {

        var localData = localStorage.getItem("Employees");
        localData = ((localStorage.getItem('Employees') !== null) ? JSON.parse(localData) : []);
        localStorage.setItem('Employees', JSON.stringify(localData));
        return localData;
    };

    this.isEmployeeExist = function (employeeId) {

        var employeeExist = false;
        var localData = JSON.parse(localStorage.getItem("Employees"));

        for (var index = 0; index < localData.length; index++) {

            if (employeeId === localData[index].id) {
                employeeExist = true;
                break;
            }
        }
        return employeeExist;
    };

    this.deleteEmployeeProfileDetails = function (employeeId) {

        deleteEmployeeBasicDetails(employeeId);
        deleteEmployeeProfilePic(employeeId);
    };

    var deleteEmployeeBasicDetails = function (employeeId) {

        var localData = JSON.parse(localStorage.getItem("EmployeeProfile"));

        for (var index = 0; index < localData.length; index++) {

            if (localData[index].id === employeeId) {

                localData.splice(index, 1);
                localStorage.setItem('EmployeeProfile', JSON.stringify(localData));
            }
        }
    };

    var deleteEmployeeProfilePic = function (employeeId) {

        var EmployeeProfilePic = JSON.parse(localStorage.getItem("EmployeeProfilePic"));

        for (var profilePicindex = 0; profilePicindex < EmployeeProfilePic.length; profilePicindex++) {

            if (EmployeeProfilePic[profilePicindex].id === employeeId) {

                EmployeeProfilePic.splice(profilePicindex, 1);
                localStorage.setItem('EmployeeProfilePic', JSON.stringify(EmployeeProfilePic));
            }
        }
    };
});
