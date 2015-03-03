var Bond = require('./models/Bond');
var path = require('path');

var urlPrefix = '/bond';

module.exports = function(app) {

  app.get(path.join(urlPrefix, '/getByPhoneNumbers'), function(request, response) {
    Bond.findOne({$or:[
      {phoneNumber1: request.query.phoneNumber1, phoneNumber2: request.query.phoneNumber2},
      {phoneNumber1: request.query.phoneNumber2, phoneNumber2: request.query.phoneNumber1} 
      ]}).exec(function (error, bond) {
      
      if (error) {
        console.log('Error getting Bond from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond from database: ' + error });
      } else {
        if (bond===null) { response.json({}); } 
        else             { response.json(bond); }
      } 
    });
  });

  app.get(path.join(urlPrefix, '/getById'), function(request, response) {
    Bond.findById(request.query.id).exec(function (error, bond) {      
      if (error) {
        console.log('Error getting Bond from database: ' + error);
        response.status(500).json({ error: 'Error getting Bond from database: ' + error });
      } else {
		response.json(bond);
      } 
    });
  });


};