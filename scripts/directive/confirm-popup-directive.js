angular.module('ess.confirmPopupDirective', [])

.directive('confirmPopup',function() {
    return {
        restrict: 'E',
        templateUrl: "confirm-popup-template.html",
        scope: {
            title :   "=",
            name :    "=",
            visible : "=",
            message : "=",
            okFn: '&',
            cancelFn: '&'
        }
    };
});
