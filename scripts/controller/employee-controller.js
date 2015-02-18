angular.module('ess.EmployeeController', ['LocalStorageModule', 'ess.employeeService', 'ess.validatorService'])

.controller("EmployeeController", function ($scope, customValidator, employeeService) {

    $scope.index = -1;
    $scope.addUpdateButtonVisible = false;

    $scope.employee = {};

    $scope.customValidate = customValidator.validateField;
    $scope.companies = employeeService.getCompanies();

    $scope.employees =new kendo.data.DataSource({

        transport: {
            read: function (options) {

                var localData = employeeService.read();
                options.success(localData);
            }
        },
        pageSize: 12
    });

    var success = function () {

        $scope.employees.read();
    };

    var error = function () {

        showPopup('internal error.', 'error', 'error.png');
    };

    var showPopup = function (message, title, image) {

        $scope.message = message;
        $scope.icon    = image;

        $scope.employeeAlert.title(title);
        $scope.employeeAlert.open().center();
    };

    var clearData = function () {

        $scope.employee = {};
        $scope.employee.company = '';
    };

    $scope.isEmployeeIdExist = function () {

        $scope.employeeExist = employeeService.isEmployeeExist($scope.employee.id);
    };

    $scope.addNewEmployee = function () {

        employeeService.addEmployee(success, error, $scope.employee);
        clearData();
        showPopup('employee added successfully', 'employee add alert', 'success.png');
    };

    $scope.deleteEmployee = function (dataItem) {

        var index = $scope.employees.indexOf(dataItem);

        employeeService.deleteEmployee(success, error, index);
        employeeService.deleteEmployeeProfileDetails(dataItem.Id);
        showPopup('employee deleted successfully', 'employee delete alert', 'success.png');
    };

    $scope.editEmployee = function (dataItem) {

        $scope.addUpdateButtonVisible = false;

        $scope.employee = dataItem;
        $scope.index = $scope.employees.indexOf(dataItem);
    };

    $scope.updateEmployeeRecord = function () {

        employeeService.updateEmployee(success, error, $scope.index, $scope.employee);
        clearData();
        showPopup('employee updated successfully', 'employee update alert', 'success.png');
    };

    $scope.search = function (name) {

        $scope.employees.filter([{
            "logic": "or",
            "filters": [
                {field: "name", operator: "contains", value: name},
                {field: "id", operator: "contains", value: name}
            ]
        }]);
    };
});
