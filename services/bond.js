var Bond = require('./models/Bond');

module.exports = function(app) {

  app.get('/api/bonds/:id', function (request, response) {
    var id = request.params.id;
    Bond.findById(id, function (error, bond) {      
      if (error) {
        console.log('Error getting Bond with id ' + id + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond with id ' + id + ' from database: ' + error });
      } else {
        response.json(bond);
      } 
    });
  });


  app.put('/api/bonds/:id', function (request, response) {
    var id = request.params.id;
    Bond.findByIdAndUpdate(id, request.body, function (error, updatedBond) {      
      if (error) {
        console.log('Error getting Bond with id ' + id + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond with id ' + id + ' from database: ' + error });
      } else {
        response.json(updatedBond);
      }  
    });
  });

};