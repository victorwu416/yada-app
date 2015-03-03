var mongoose = require('mongoose');

var localUriString = 'mongodb://localhost/yadaapp';
var herokuUriString = 'mongodb://yadaapp:ecclesiastesfrancisautomobilesneakers@ds049181.mongolab.com:49181/heroku_app34490307';



var uriString = localUriString;
mongoose.connect(uriString, function (error) {
  if (!error) {
    console.log('Successfully connected to: ' + uriString);
  } else {
    console.log('Error connecting to: ' + uriString + ': ' + error);
		
    uriString = herokuUriString;
    mongoose.connect(uriString, function (error) {		
      if (!error) {
        console.log('Successfully connected to: ' + uriString);
      } else {
        console.log('Error connecting to: ' + uriString + ': ' + error);
	  }
    });
  }
});	