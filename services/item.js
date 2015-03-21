var Item = require('./models/Item');
var async = require('async');

module.exports = function(app) {

  app.get('/api/bonds/:id/items', function (request, response) {
    var id = request.params.id;
    Item.find({ bondId: id }, function (error, items) {      
      if (error) {
        console.log('Error getting Items for Bond with id ' + id + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Items for Bond with id ' + id + ' from database: ' + error });
      } else {
        response.json(items);
      } 
    });
  });

  app.put('/api/items', function (request, response) {
    var items = request.body;
    var savedItems = [];
    var saveItemsError = false;    
    var saveItemAsyncTasks = [];

    items.forEach(function (item) {
      saveItemAsyncTasks.push(function (callback) {
        if (item._id === undefined) {
          var newItem = new Item(item);
          newItem.save(function (error, newItem) {
            if (error) { 
              console.log('Error inserting new Item into database: ' + error); 
              saveItemsError = true;
            } else {
              savedItems.push(newItem);
            }
            callback();
          });
        } else {
          Item.findByIdAndUpdate(item._id, item, function (error, updatedItem) {
            if (error) {
              console.log('Error updating existing Item in database: ' + error); 
              saveItemsError = true;
            } else {
              savedItems.push(updatedItem);
            }
            callback();
          });
        }        
      });
    });
      
    async.series(saveItemAsyncTasks, function () {
      if (saveItemsError) {
        response.status(500).json({ error: 'Error saving Items to database' });          
      } else {
        response.json(savedItems);
      }
    });
  });
};