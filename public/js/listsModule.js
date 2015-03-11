var listsModule = angular.module('listsModule', []);

mainModule.controller('ListsController', ['$scope', '$location', '$http', function ($scope, $location, $http) {

  $scope.saveList = function () {


  }


  $scope.getAndPopulate = function () {
    $scope.id = $location.search().id;
    $http.get('/api/bonds/' + $scope.id + '/items')
      .error(function (data, status, headers, config) {
        console.log('Error getting Items for Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.items = data;
        var newItem = { bondId: $scope.id, description: '', status: 'open' };
        $scope.items.push(newItem);
      });
  }

  $scope.getAndPopulate();


}]);



 