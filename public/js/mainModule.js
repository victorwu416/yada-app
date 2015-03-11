var mainModule = angular.module('mainModule', []);

console.log('Loading mainModule');

mainModule.controller('MainController', ['$scope', '$location', '$http', function ($scope, $location, $http) {
  console.log('MainController');


}]);



 