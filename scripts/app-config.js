angular.module('ess.config', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login.html'
    }).state('employee', {
        url: '/employee',
        templateUrl: 'employee.html'
    }).state('company', {
        url: '/company',
        templateUrl: 'company.html'
    }).state('about', {
        url: '/about',
        templateUrl: 'about.html'
    }).state('changePassword', {
        url: '/changePassword',
        templateUrl: 'change-password.html'
    }).state('employeeProfile', {
        url: '/employeeProfile',
        templateUrl: 'employee-profile.html'
    }).state('companyChart', {
        url: '/companyChart',
        templateUrl: 'company-chart.html'
    });
});
