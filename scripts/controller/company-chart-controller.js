angular.module('ess.CompanyChartController', ['LocalStorageModule'])

.controller("CompanyChartController", function ($scope, localStorageService) {

    var companyEmployeeRecord = [];

    var localData   = JSON.parse(localStorage.getItem("Companies")) ;
    var allEmployee = JSON.parse(localStorage.getItem("Employees"));

    angular.forEach(localData, function (element) {

        companyEmployeeRecord.push({name: element.name, noOfEmployee: 0});
    });

    angular.forEach(allEmployee, function (employee) {

        angular.forEach(companyEmployeeRecord, function (companyEmployeeRecord) {

            if (employee.company === companyEmployeeRecord.name) {

                companyEmployeeRecord.noOfEmployee = companyEmployeeRecord.noOfEmployee + 1;
            }
        });
    });
    $scope.companyChart = new kendo.data.DataSource({
                  data: companyEmployeeRecord

      });
});
