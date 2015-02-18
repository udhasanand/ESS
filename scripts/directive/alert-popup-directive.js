angular.module('ess.alertPopupDirective', [])

.directive('alertPopup',function() {
    return {
        restrict: 'E',
		templateUrl: "alert-popup-template.html",
        scope: {
            title :   "=",
            name :    "=",
            visible : "=",
			message : "=",
			image :   "="
        }
    };
});
