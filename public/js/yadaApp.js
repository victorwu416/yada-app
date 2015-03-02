var yadaApp = angular.module('yadaApp', ['ngRoute', 'mainModule', 'settingsModule']);

console.log('Yadadadadada');

yadaApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/',         {templateUrl: 'templates/main.html',     controller: 'MainController'});
    $routeProvider.when('/settings', {templateUrl: 'templates/settings.html', controller: 'SettingsController'});
  }
]);