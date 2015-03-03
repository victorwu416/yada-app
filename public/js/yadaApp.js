var yadaApp = angular.module('yadaApp', ['ui.router', 'mainModule', 'settingsModule']);

console.log('Yadadadadada');

/*
yadaApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/',         {templateUrl: 'templates/main.html',     controller: 'MainController'});
    $routeProvider.when('/settings', {templateUrl: 'templates/settings.html', controller: 'SettingsController'});
  }
]);
*/

yadaApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider
    .state('main',     {url: '/main',     templateUrl: 'partials/main.html',     controller: 'MainController'})
    .state('settings', {url: '/settings', templateUrl: 'partials/settings.html', controller: 'SettingsController'});

});