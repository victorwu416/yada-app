var mainModule = angular.module('mainModule', []);

console.log('Loading mainModule');

mainModule.controller('MainController', ['$scope', function ($scope) {
  console.log('MainController');
}]);



 