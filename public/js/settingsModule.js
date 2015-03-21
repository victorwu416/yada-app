var settingsModule = angular.module('settingsModule', ['ui.mask']);

settingsModule.controller('SettingsController', ['$scope', '$location', '$http', 
                          function ($scope, $location, $http) {

  $scope.changeToClean = function () {
    $scope.inputBackground = '';
    $scope.showSaveButton = false; 
  };

  $scope.changeToDirty = function () {
    $scope.inputBackground = 'input-dirty';
    $scope.showSaveButton = true;
    $scope.showSaveSuccess = false;  
  };

  $scope.saveBond = function () {
    $scope.showSaveButton = false;
    $scope.showLoadingIcon = true;

    $http.put('/api/bonds/' + $scope.id, $scope.bond)
      .error(function (data, status, headers, config) {
        console.log('Error putting Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.showLoadingIcon = false;
        $scope.showSaveSuccess = true;
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

