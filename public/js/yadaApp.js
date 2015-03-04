var yadaApp = angular.module('yadaApp', ['ui.router', 'mainModule', 'settingsModule']);

yadaApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider
    .state('main',     {url: '/main',     templateUrl: 'partials/main.html',     controller: 'MainController'})
    .state('settings', {url: '/settings', templateUrl: 'partials/settings.html', controller: 'SettingsController'});

});