var yadaApp = angular.module('yadaApp', ['ui.router', 'mainModule', 'settingsModule', 'listsModule']);

yadaApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');

  $stateProvider
    .state('main',     {url: '/main',     templateUrl: 'partials/main.html',     controller: 'MainController'})
    .state('settings', {url: '/settings', templateUrl: 'partials/settings.html', controller: 'SettingsController'})
    .state('lists   ', {url: '/lists',    templateUrl: 'partials/lists.html',    controller: 'ListsController'});

});