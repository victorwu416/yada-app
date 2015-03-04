var Bond = require('./models/Bond');
var path = require('path');

var restUrlPrefix = '/api/bonds';

module.exports = function(app) {

  app.get(path.join(restUrlPrefix, '/:id'), function(request, response) {
    var bondId = request.params.id;
    Bond.findById(bondId).exec(function (error, bond) {      
      if (error) {
        console.log('Error getting Bond with id ' + bondId + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond with id ' + bondId + ' from database: ' + error });
      } else {
        if (bond===null) { response.json({}); } 
        else             { response.json(bond); }
      } 
    });
  });


  app.get(path.join(restUrlPrefix, '/:phoneNumber1/:phoneNumber2'), function(request, response) {
    var bondPhoneNumber1 = request.params.phoneNumber1;
    var bondPhoneNumber2 = request.params.phoneNumber2;
    Bond.findOne({$or:[
      {phoneNumber1: bondPhoneNumber1, phoneNumber2: bondPhoneNumber2},
      {phoneNumber1: bondPhoneNumber2, phoneNumber2: bondPhoneNumber1} 
      ]}).exec(function (error, bond) {
      
      if (error) {
        console.log('Error getting Bond with phone numbers (' + 
                    bondPhoneNumber1 + ',' + bondPhoneNumber2 + ') from database: ' + error);
        response.status(500).json({error: 
                    'Error getting Bond with phone numbers (' + 
                    bondPhoneNumber1 + ',' + bondPhoneNumber2 + ') from database: ' + error});
      } else {
        if (bond===null) { response.json({}); } 
        else             { response.json(bond); }
      } 
    });
  });


  app.put(path.join(restUrlPrefix, '/:id'), function(request, response) {
    var bondId = request.params.id;
    var newBond = request.body;
    Bond.findByIdAndUpdate(bondId, newBond).exec(function (error, updatedBond) {      
      if (error) {
        console.log('Error getting Bond with id ' + bondId + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond with id ' + bondId + ' from database: ' + error });
      } else {
        response.json(updatedBond);
      }  
    });
  });

};