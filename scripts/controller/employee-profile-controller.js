angular.module('ess.EmployeeProfileController', ['LocalStorageModule', 'ess.employeeProfileService', 'ess.validatorService'])

.controller('EmployeeProfileController', function ($scope, employeeProfileService, $timeout) {

    $scope.employee        = {};
    $scope.updatedEmployee = {};

    $scope.editButtonText = 'Edit';

    $scope.employee.imageUrl = '';

    $scope.employeeQualificationProfileUrl = 'employee-qualification-profile.html';

    $scope.employeeBesicInformation = employeeProfileService.getEmployeeBesicDetails();
    $scope.employeesName            = employeeProfileService.getNames();

    $scope.skillOptions = new kendo.data.DataSource({

        transport: {
            read: function (options) {
                var localData = employeeProfileService.getSkills();
                options.success(localData);
            }
        }
    });

    $scope.languageOptions = new kendo.data.DataSource({

        transport: {
            read: function (options) {
                var localData = employeeProfileService.getLanguages();
                options.success(localData);
            }
        }
    });

    $scope.certificateOptions = new kendo.data.DataSource({

        transport: {
            read: function (options) {
                var localData = employeeProfileService.getCertificates();
                options.success(localData);
            }
        }
    });

    var showConfirmBox = function () {

        $scope.message = 'Do you want to save.';
        $scope.confirmAlert.open().center();
    };

    var setSelectedEmployeeProfileDetails = function () {

        var getEmployeeProfileDetails = employeeProfileService.getEmployeeProfileDetails();

        for (var index = 0; index < getEmployeeProfileDetails.length; index++) {

            if (getEmployeeProfileDetails[index].id === $scope.employee.id) {

                $scope.employee.skill        = getEmployeeProfileDetails[index].skill;
                $scope.employee.language     = getEmployeeProfileDetails[index].language;
                $scope.employee.certificates = getEmployeeProfileDetails[index].certificates;
                $scope.employee.experience   = getEmployeeProfileDetails[index].experience;
            }
        }
        $scope.employee.imageUrl = employeeProfileService.getEmployeeProfilePic($scope.employee.id);
    };

    var setSelectedEmployeeUpdatedProfileDetails = function () {

        $scope.updatedEmployee.languages    = $scope.employee.language;
        $scope.updatedEmployee.skills       = $scope.employee.skill;
        $scope.updatedEmployee.certificates = $scope.employee.certificates;
        $scope.updatedEmployee.experience   = $scope.employee.experience;

    };

    var clear = function () {

        $scope.employee.certificates = '';
        $scope.employee.skill        = '';
        $scope.employee.language     = '';
        $scope.employee.experience   = '';
    };

    $scope.editEmployeeProfile = function () {


        $scope.editButtonText = ($scope.editButtonText === 'Edit') ? 'Done' : 'Edit';

        if ($scope.employeeQualificationProfileUrl === 'employee-qualification-profile-update.html') {
            showConfirmBox();
        }
        $scope.employeeQualificationProfileUrl = ($scope.employeeQualificationProfileUrl === 'employee-qualification-profile.html') ? 'employee-qualification-profile-update.html' : 'employee-qualification-profile.html';
    };

    $scope.setSelectedEmployeeDetails = function () {

        clear();

        $scope.employee.id = $scope.employee.as.match(/\d+/)[0];
        var getEmployeeBesicDetails = employeeProfileService.getEmployeeBesicDetails();

        angular.forEach(getEmployeeBesicDetails, function (element) {

            if (element.id === $scope.employee.id) {

                $scope.employee.name        = element.name;
                $scope.employee.company     = element.company;
                $scope.employee.designation = element.designation;
                $scope.employee.email       = element.email;
            }
        });
        setSelectedEmployeeProfileDetails();
        setSelectedEmployeeUpdatedProfileDetails();
    };

    $scope.saveEmployeeProfile = function () {

        var employeeProfileDetails = {
            id:           $scope.employee.id,
            skill:        $scope.employee.skill,
            language:     $scope.employee.language,
            certificates: $scope.employee.certificates,
            experience:   $scope.employee.experience
        };

        employeeProfileService.updateEmployeeProfile(employeeProfileDetails);
        setSelectedEmployeeUpdatedProfileDetails();
        $scope.confirmAlert.close();
        $scope.updateAlert.open().center();
    };

    $scope.undoEmployeeProfileUdtation = function () {

        var employeeOldProfileData = employeeProfileService.undoUpdateEmployee($scope.employee.id);

        $scope.employee.language     = employeeOldProfileData.language;
        $scope.employee.certificates = employeeOldProfileData.certificates;
        $scope.employee.experience   = employeeOldProfileData.experience;
        $scope.employee.skill        = employeeOldProfileData.skill;

        $scope.confirmAlert.close();
    };

    $scope.setEmployeeProfilePic = function (event) {

        var input = event.target;
        alert();
        var reader = new FileReader();

        reader.onload = function() {

            $timeout(function() {

                $scope.employee.imageUrl = reader.result;
                employeeProfileService.setEmployeeProfilePic($scope.employee.id, $scope.employee.imageUrl);
            });
        };
        reader.readAsDataURL(input.files[0]);
    };
});
