var Bond = require('./models/Bond');
var path = require('path');

var restUrlPrefix = '/api/bonds';

module.exports = function(app) {

  app.get(path.join(restUrlPrefix, '/:id'), function(request, response) {
    var id = request.params.id;
    Bond.findById(id).exec(function (error, bond) {      
      if (error) {
        console.log('Error getting Bond with id ' + id + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond with id ' + id + ' from database: ' + error });
      } else {
        if (bond===null) { response.json({}); } 
        else             { response.json(bond); }
      } 
    });
  });


  app.put(path.join(restUrlPrefix, '/:id'), function(request, response) {
    var id = request.params.id;
    var newBond = request.body;
    Bond.findByIdAndUpdate(id, newBond).exec(function (error, updatedBond) {      
      if (error) {
        console.log('Error getting Bond with id ' + id + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond with id ' + id + ' from database: ' + error });
      } else {
        if (updatedBond===null) { response.json({}); } 
        else                    { response.json(updatedBond); }
      }  
    });
  });

};