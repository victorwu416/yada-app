var settingsModule = angular.module('settingsModule', ['ui.mask', 'toaster']);

settingsModule.controller('SettingsController', ['$scope', '$location', '$http', 'toaster',
                          function ($scope, $location, $http, toaster) {

  $scope.changeToClean = function () {
    $scope.inputBackground = '';
    $scope.showSaveButton = false; 
  };

  $scope.changeToDirty = function () {
    $scope.inputBackground = 'input-dirty';
    $scope.showSaveButton = true;
  };

  $scope.saveBond = function () {
    $scope.showSaveButton = false;

    $http.put('/api/bonds/' + $scope.id, $scope.bond)
      .error(function (data, status, headers, config) {
        console.log('Error putting Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        toaster.pop('success', 'Saved!', '');
        $scope.changeToClean();
      });
  };

  $scope.getAndPopulate = function () {
    $scope.id = $location.search().id;
    $http.get('/api/bonds/' + $scope.id)
      .error(function (data, status, headers, config) {
        console.log('Error getting Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.bond = data;
      });
  };

  $scope.showSettings = false;
  $scope.getAndPopulate();
  $scope.changeToClean();
  $scope.showSettings = true;
}]);

