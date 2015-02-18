
angular.module('ess.validatorService', [])

.service("customValidator", function () {

    this.validateField = function (item, message) {

        if (item.$error.required && item.$dirty) {
            return "required";
        } else if (item.$error.pattern || item.$error.email || item.$error.url) {
            return message;
        }
    };
});
