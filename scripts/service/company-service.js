angular.module('ess.companyService', ['LocalStorageModule'])

.service("companyService", function (localStorageService) {

    this.addComapny = function (success, error, newCompany) {

        var localData = JSON.parse(localStorage.getItem("Companies"));

        if (localData === null || localData === undefined) {
            return error();
        }
        newCompany.name = newCompany.name.toUpperCase();
        localData.push(newCompany);
        localStorage.setItem("Companies", JSON.stringify(localData));
        return success ();
    };

    this.deleteCompany = function (success, error, index) {

        var localData = JSON.parse(localStorage.getItem("Companies"));

        if (localData === null || localData === undefined) {
            return error();
        }
        localData.splice(index, 1);
        localStorage.setItem("Companies", JSON.stringify(localData));
        return success();
    };

    this.updateCompany = function (success, error, index, updateCompany) {

    var localData = JSON.parse(localStorage.getItem("Companies"));

    if (localData === null || localData === undefined) {
        return error();
    }
    updateCompany.name = updateCompany.name.toUpperCase();
    localData.splice(index, 1, updateCompany);
    localStorage.setItem("Companies", JSON.stringify(localData));
    return success();
    };

    this.read = function () {

        var localData = localStorage.getItem("Companies");
        localData = ((localStorage.getItem('Companies') !== null) ? JSON.parse(localData) : []);
        localStorage.setItem('Companies', JSON.stringify(localData));
        return localData;
    };

    this.isCompanyExist = function (companyName) {

        var companyExist = false;
        var localData = JSON.parse(localStorage.getItem("Companies"));

        angular.forEach(localData, function (element) {

            if (companyName === element.name) {
                companyExist = true;
            }
        });
        return companyExist;
    };
});
