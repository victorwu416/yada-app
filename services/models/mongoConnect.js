var mongoose = require('mongoose');

var localUriString = 'mongodb://localhost/yadaapp';
var herokuUriString = 'mongodb://yadaapp:ecclesiastesfrancisautomobilesneakers@ds049181.mongolab.com:49181/heroku_app34490307';


mongoose.connect(localUriString, function (error) {
  if (!error) {
    console.log('Successfully connected to: ' + localUriString);
  } else {
    console.log('Error connecting to: ' + localUriString + ': ' + error);
		
    mongoose.connect(herokuUriString, function (error) {		
      if (!error) {
        console.log('Successfully connected to MongoLab MongoDB');
      } else {
        console.log('Error connecting to MongoLab MongoDB: ' + error);
	  }
    });
  }
});	