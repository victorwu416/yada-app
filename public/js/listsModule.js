var listsModule = angular.module('listsModule', ['ui.bootstrap']);

listsModule.controller('ListsController', ['$scope', '$location', '$http', '$modal', 
                       function ($scope, $location, $http, $modal) {

  $scope.changeToClean = function () {
    $scope.itemsDirtiness = [];
    $scope.items.forEach(function (item) {
      $scope.itemsDirtiness.push(false);
    });
  };

  $scope.saveItems = function () {
    $scope.showSaveButton = false;
    $scope.showLoadingIcon = true;

    var items = $scope.items.slice();
	if (items[items.length-1].description.length === 0) {
      items.pop();
    }
    $http.put('/api/items', items)
      .error(function (data, status, headers, config) {
        console.log('Error putting Items');
      })
      .success(function (data, status, headers, config) {
        $scope.items = data;
        var newItem = { bondId: $scope.id, description: '', status: 'open' };
        $scope.items.push(newItem);
        $scope.showLoadingIcon = false;
        $scope.showSaveSuccess = true;
        $scope.changeToClean();
      });
  };

  $scope.onInputChange = function (index) {
    $scope.showSaveSuccess = false;
    $scope.showSaveButton = true;
    $scope.itemsDirtiness[index] = true;
    if ($scope.items[$scope.items.length-1].description.length !== 0) {
      var newItem = { bondId: $scope.id, description: '', status: 'open' };
      $scope.items.push(newItem); 
    }
  };

  $scope.openMarkAsDoneModal = function (item) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/markAsDoneModal.html',
      controller: 'MarkAsDoneModalController',
	  size: 'sm',
      resolve: {
        item: function () { return item; },
        listsControllerScope: function () { return $scope; }
      }
    });
  };

  $scope.getAndPopulate = function () {
    $scope.showLists = false;
    $scope.id = $location.search().id;
    $http.get('/api/bonds/' + $scope.id + '/items')
      .error(function (data, status, headers, config) {
        console.log('Error getting Items for Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.items = data;
        var newItem = { bondId: $scope.id, description: '', status: 'open' };
        $scope.items.push(newItem);
        $scope.changeToClean();
        $scope.showLists = true;
      });
  }

  $scope.getAndPopulate();
}]);

mainModule.controller('MarkAsDoneModalController', function ($scope, $modalInstance, item, listsControllerScope) {
  $scope.dismiss = function () {
    $modalInstance.dismiss();
  };

  $scope.markAsDoneAndSaveItems = function () {
    item.status = 'done';
    listsControllerScope.saveItems();
    $scope.dismiss();
  };
});




 