angular.module('ess.CompanyController', ['LocalStorageModule', 'ess.companyService', 'ess.validatorService'])

.controller("CompanyController", function ($scope, customValidator, companyService, localStorageService) {

    $scope.addUpdateButtonVisible = false;
    $scope.index = -1;

    $scope.company = {};

    $scope.customValidate = customValidator.validateField;

    $scope.companies = new kendo.data.DataSource({

        transport: {
            read: function (options) {

                var localData = companyService.read();
                options.success(localData);
            }
        },
        pageSize: 12
    });

    var success = function () {

        $scope.companies.read();
    };

    var error = function () {

        showPopup('internal error.', 'error', 'error.png');
    };

    var showPopup = function (message, title, image) {

        $scope.message = message;
        $scope.icon    = image;

        $scope.companyAlert.title(title);
        $scope.companyAlert.open().center();
    };

    var clearData = function () {

        $scope.company = {};
    };

    $scope.isCompanyNameExist = function () {

        $scope.companyExist = companyService.isCompanyExist($scope.company.name.toUpperCase());
    };

    $scope.addNewCompany = function () {

        companyService.addComapny(success, error, $scope.company);
        clearData();
        showPopup('company added successfully', 'Company add alert', 'success.png');
    };

    $scope.deleteCompany = function (dataItem) {

        var index = $scope.companies.indexOf(dataItem);
        companyService.deleteCompany(success, error, index);
        showPopup('company deleted successfully', 'Company delete alert', 'success.png');
    };

    $scope.editCompany = function (dataItem) {

        $scope.addUpdateButtonVisible = false;
        $scope.company = dataItem;
        $scope.index = $scope.companies.indexOf(dataItem);
    };

    $scope.updateCompanyRecord = function () {

        companyService.updateCompany(success, error, $scope.index, $scope.company);
        clearData();
        showPopup('Cpmpany updated successfully', 'Company update alert', 'success.png');
    };
});
