var settingsModule = angular.module('settingsModule', []);

settingsModule.controller('SettingsController', ['$scope', '$location', '$http', function ($scope, $location, $http) {

  $scope.showSettings = false;
  $scope.saveButtonDisabled = true;

  $scope.id = $location.search().id;

  $http.get('/api/bonds/' + $scope.id)
    .error(function (data, status, headers, config) {
      console.log('Error getting Bond with id: ' + $scope.id);
    })
    .success(function (data, status, headers, config) {
      $scope.bond = deserializeBondJson(data)
      $scope.showSettings = true;
    });

}]);

function deserializeBondJson(bondJson) {
  var bond = {};
  bond.name1 = bondJson.name1;
  bond.name2 = bondJson.name2;
  bond.phoneNumber1 = parseInt(bondJson.phoneNumber1);
  bond.phoneNumber2 = parseInt(bondJson.phoneNumber2);
  return bond;
}