var Item = require('./models/Item');

module.exports = function(app) {

  app.get('/api/bonds/:id/items', function(request, response) {
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


  app.post('/api/items', function(request, response) {
    var newItem = new Item(request.body);
    newItem.save(function (error, newItem) {
      if (error) {
        console.log('Error inserting new Item into database: ' + error);
        response.status(500).json({ error: 'Error inserting new Item into database: ' + error });
      } else {
        response.json(newItem);
      } 
    });
  });

};