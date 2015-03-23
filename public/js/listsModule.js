var listsModule = angular.module('listsModule', ['ui.bootstrap', 'toaster']);

listsModule.controller('ListsController', ['$scope', '$location', '$http', '$modal', 'toaster', 
                       function ($scope, $location, $http, $modal, toaster) {

  $scope.sendSmsReminder = function (item) {
    console.log('send sms');
  } 

  $scope.changeToClean = function () {
    $scope.itemsDirtiness = [];
    $scope.items.forEach(function (item) {
      $scope.itemsDirtiness.push(false);
    });
  };

  $scope.getItemsInPreviousOrder = function (previousItems, returnedItems) {
    var sortedItems = [];
    for (var i = 0; i < previousItems.length; i++) {
      for (var j = 0; j < returnedItems.length; j++) {
        if (returnedItems[j]._id === previousItems[i]._id) {
          sortedItems.push(returnedItems[j]);
          returnedItems.splice(j,1);
          break;
        }
      }
    }
    while (returnedItems.length > 0) {
      sortedItems.push(returnedItems[0]);
      returnedItems.splice(0,1);
    }
    return sortedItems;
  };

  $scope.compareOnAssigneeAndDescription = function (item0, item1) {
    if      (item0.assignee < item1.assignee) { return -1; }
    else if (item0.assignee > item1.assignee) { return 1; }
    if      (item0.description.toLowerCase() < item1.description.toLowerCase()) { return -1; }
    else if (item0.description.toLowerCase() > item1.description.toLowerCase()) { return 1; }
    return 0;    
  }

  $scope.getItemsInSortedOrder = function (items) {
    return items.sort($scope.compareOnAssigneeAndDescription).slice(0);
  }

  $scope.setSaveSortButtonDisplay = function(showSaveButton, showSortButton) {
    $scope.showSaveButton = showSaveButton;
    $scope.showSortButton = showSortButton;
  };

  $scope.saveItems = function () {
    $scope.setSaveSortButtonDisplay(false, false);    
    var items = $scope.items.slice(0);
	if (items[items.length-1].description.length === 0) { items.pop(); }
    $http.put('/api/items', items)
      .error(function (data, status, headers, config) {
        console.log('Error putting Items');
      })
      .success(function (data, status, headers, config) {
        $scope.items = $scope.getItemsInPreviousOrder($scope.items.slice(0), data);
        $scope.items.push({ bondId: $scope.id, description: '', status: 'open', assignee: 0 });
        $scope.setSaveSortButtonDisplay(false, true);   
        $scope.changeToClean();
        toaster.pop('success', '', 'Saved!');
      });
  };

  $scope.onInputChange = function (index) {
    $scope.setSaveSortButtonDisplay(true, false);   
    $scope.itemsDirtiness[index] = true;
    if ($scope.items[$scope.items.length-1].description.length !== 0) {
      $scope.items.push({ bondId: $scope.id, description: '', status: 'open', assignee: 0 }); 
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
  
  $scope.sortItems = function () {
    $scope.setSaveSortButtonDisplay(false, false);
    $scope.getAndPopulateItems(function () {
      toaster.pop('warning', '', 'Sorted!');
    });
  }

  $scope.getAndPopulateItems = function (callback) {
    $scope.id = $location.search().id;
    $http.get('/api/bonds/' + $scope.id + '/items')
      .error(function (data, status, headers, config) {
        console.log('Error getting Items for Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.items = $scope.getItemsInSortedOrder(data);
        $scope.items.push({ bondId: $scope.id, description: '', status: 'open', assignee: 0 });
        $scope.setSaveSortButtonDisplay(false, false);   
        $scope.changeToClean();
        callback();
      });
  }

  $scope.getAndPopulateBond = function () {
    $scope.id = $location.search().id;
    $http.get('/api/bonds/' + $scope.id)
      .error(function (data, status, headers, config) {
        console.log('Error getting Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.bond = data;
      });
  };

  $scope.getAndPopulateItems(function() {});
  $scope.getAndPopulateBond();
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

  $scope.item = item;
});




 