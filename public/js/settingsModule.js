var settingsModule = angular.module('settingsModule', []);

settingsModule.controller('SettingsController', ['$scope', '$location', '$http', function ($scope, $location, $http) {

  $scope.showSettings = false;
  $scope.showSaveButton = false;
  $scope.showLoading = false;
  $scope.showSaveSuccess = false;

  $scope.id = $location.search().id;

  $http.get('/api/bonds/' + $scope.id)
    .error(function (data, status, headers, config) {
      console.log('Error getting Bond with id: ' + $scope.id);
    })
    .success(function (data, status, headers, config) {
      $scope.bond = data
      $scope.showSettings = true;
    });

  $scope.saveBond = function () {
    $scope.showSaveButton = false;
    $scope.showLoadingIcon = true;

    $http.put('/api/bonds/' + $scope.id, $scope.bond)
      .error(function (data, status, headers, config) {
        console.log('Error getting Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.showLoadingIcon = false;
        $scope.showSaveSuccess = true;
      });
  }

}]);