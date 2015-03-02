var mainModule = angular.module('mainModule', []);

console.log('mainModule here!');

mainModule.controller('MainController', ['$scope', function ($scope) {
  console.log(' main controller');
}]);



 