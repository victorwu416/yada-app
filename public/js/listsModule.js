var listsModule = angular.module('listsModule', ['ui.bootstrap', 'toaster']);

listsModule.controller('ListsController', ['$scope', '$location', '$http', '$modal', 'toaster', 
                       function ($scope, $location, $http, $modal, toaster) {

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
  };

  $scope.getItemsInSortedOrder = function (items) {
    return items.sort($scope.compareOnAssigneeAndDescription).slice(0);
  };

  $scope.onInputChange = function (index) {
    $scope.showPanelItemsButtons = true;
    $scope.itemsDirtiness[index] = true;
    if ($scope.items[$scope.items.length-1].description.length !== 0) {
      $scope.items.push({ bondId: $scope.id, description: '', status: 'open', assignee: 0 }); 
    }
  };

  $scope.saveItems = function (callback) {
    $scope.showItemsLoadingSpinner = true;
    $scope.changeToClean();
    $scope.showPanelItemsButtons = false;
    var items = $scope.items.slice(0);
	if (items[items.length-1].description.length === 0) { items.pop(); }
    $http.put('/api/items', items)
      .error(function (data, status, headers, config) {
        console.log('Error putting Items');
      })
      .success(function (data, status, headers, config) {
        $scope.items = $scope.getItemsInPreviousOrder($scope.items.slice(0), data);
        $scope.items.push({ bondId: $scope.id, description: '', status: 'open', assignee: 0 });
        $scope.showItemsLoadingSpinner = false;
        toaster.pop('success', '', 'Saved!');
        if (callback!==undefined) { callback(); }
      });
  };
  
  $scope.openMarkAsDoneModal = function (item) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/markAsDoneModal.html',
      controller: 'MarkAsDoneModalController',
	  size: 'sm',
      resolve: {
        item: function () { return item; },
        listsControllerScope: function () { return $scope; },
        toaster: function () { return toaster; }
      }
    });
  };

  $scope.openSendSmsReminderModal = function (item) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/sendSmsReminderModal.html',
      controller: 'SendSmsReminderModalController',
	  size: 'sm',
      resolve: {
        item: function () { return item; },
        listsControllerScope: function () { return $scope; },
        toaster: function () { return toaster; }
      }
    });
  }; 

  $scope.getAndPopulateItems = function (callback) {
    $scope.showItemsLoadingSpinner = true;
    $http.get('/api/bonds/' + $scope.id + '/items')
      .error(function (data, status, headers, config) {
        console.log('Error getting Items for Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.items = $scope.getItemsInSortedOrder(data);
        $scope.items.push({ bondId: $scope.id, description: '', status: 'open', assignee: 0 });
        $scope.showItemsLoadingSpinner = false;
        $scope.showPanelItemsButtons = false;
        $scope.changeToClean();
        if (callback!==undefined) { callback(); }
      });
  };

  $scope.getAndPopulateBond = function () {
    $http.get('/api/bonds/' + $scope.id)
      .error(function (data, status, headers, config) {
        console.log('Error getting Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.bond = data;
      });
  };

  $scope.saveNewMessageAndRefreshMessages = function () {
    var newMessage = {
      'bondId': $scope.id,
      'person': $scope.currentPerson,
      'body'  : $scope.newMessageBody
    };
    $scope.newMessageBody = '';
    $http.post('/api/messages', newMessage)
      .error(function (data, status, headers, config) {
        console.log('Error posting Message');
      })
      .success(function (data, status, headers, config) {
        $scope.getAndPopulateMessages();
      });
  }

  $scope.getAndPopulateMessages = function () {
    $scope.showMessagesLoadingSpinner = true;
    $scope.newMessageBody = '';
    $http.get('/api/bonds/' + $scope.id + '/messages')
      .error(function (data, status, headers, config) {
        console.log('Error getting Messages for Bond with id: ' + $scope.id);
      })
      .success(function (data, status, headers, config) {
        $scope.messages = data;
        $scope.showMessagesLoadingSpinner = false;
      });
  };

  $scope.getStoredCurrentPerson = function () { 
    if (typeof(Storage) === 'undefined') { return 1; }
    if (localStorage.getItem('currentPerson') === null) {
      $scope.setStoredCurrentPerson(1);
      return 1;
    }    
    if (localStorage.getItem('currentPerson') === '1') {
      return 1;
    } else {
      return 2;
    }
  };
 
  $scope.setStoredCurrentPerson = function (currentPerson) {
    if (currentPerson === 1) { localStorage.setItem('currentPerson', '1'); }
    else                     { localStorage.setItem('currentPerson', '2'); } 
    $scope.currentPerson = currentPerson; 
  };

  $scope.id = $location.search().id;
  $scope.getAndPopulateItems(function() {});
  $scope.getAndPopulateBond();
  $scope.currentPerson = $scope.getStoredCurrentPerson();

  $scope.getAndPopulateMessages();

}]);

mainModule.controller('MarkAsDoneModalController', 
                      function ($scope, $modalInstance, $location, $http, item, listsControllerScope, toaster) {
  $scope.dismiss = function () {
    $modalInstance.dismiss();
  };

  $scope.markAsDoneAndSaveItems = function () {
    item.status = 'done';
    listsControllerScope.saveItems();
    $scope.dismiss();
  };

  $scope.markAsDoneAndSaveItemsAndNotify = function () {
    item.status = 'done';
    listsControllerScope.saveItems();

    var numItems = 0;
    listsControllerScope.items.forEach(function (item) {
      if (item.status === 'open') { numItems++; }
    });
    numItems--;
    var phoneNumberTo = ($scope.currentPerson===1 ? $scope.bond.phoneNumber2 : $scope.bond.phoneNumber1);
    var nameTo =        ($scope.currentPerson===1 ? $scope.bond.name2        : $scope.bond.name1);
    var nameFrom =      ($scope.currentPerson===1 ? $scope.bond.name1        : $scope.bond.name2);
    var body = nameFrom + ':' + ' DONE ' + item.description + ' | ' + 
               numItems + ' OPEN ITEMS ' + $location.absUrl();
    var sms = { 'phoneNumberTo': phoneNumberTo, 'body': body };
    $http.post('/api/sms', sms)
      .error(function (data, status, headers, config) {
        console.log('Error sending SMS');
      })
      .success(function (data, status, headers, config) {
        toaster.pop('wait', '', 'Sent!');
      });

    $scope.dismiss();
  }

  $scope.item = item;
  $scope.bond = listsControllerScope.bond;
  $scope.currentPerson = listsControllerScope.currentPerson;
});

mainModule.controller('SendSmsReminderModalController',
                      function ($scope, $modalInstance, $location, $http, item, listsControllerScope, toaster) {
  $scope.dismiss = function () {
    $modalInstance.dismiss();
  };

  $scope.sendSmsReminder = function () {
    var numItems = 0;
    listsControllerScope.items.forEach(function (item) {
      if (item.status === 'open') { numItems++; }
    });
    numItems--;
    var phoneNumberTo = ($scope.currentPerson===1 ? $scope.bond.phoneNumber2 : $scope.bond.phoneNumber1);
    var nameTo =        ($scope.currentPerson===1 ? $scope.bond.name2        : $scope.bond.name1);
    var nameFrom =      ($scope.currentPerson===1 ? $scope.bond.name1        : $scope.bond.name2);
    var body = nameFrom + ':' + ' REMEMBER ' + item.description + ' | ' + 
               numItems + ' OPEN ITEMS ' + $location.absUrl();
    var sms = { 'phoneNumberTo': phoneNumberTo, 'body': body };
    $http.post('/api/sms', sms)
      .error(function (data, status, headers, config) {
        console.log('Error sending SMS');
      })
      .success(function (data, status, headers, config) {
        toaster.pop('wait', '', 'Sent!');
      });

    $scope.dismiss();
  };

  $scope.item = item;
  $scope.bond = listsControllerScope.bond;
  $scope.currentPerson = listsControllerScope.currentPerson;
});