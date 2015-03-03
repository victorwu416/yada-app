var mongoose = require('mongoose');

var localUriString = 'mongodb://localhost/yadaapp';
//var herokuUriString = 'mongodb://heroku_app29129685:3f7g6jb5iqo0shhjldgrc9m724@ds033760.mongolab.com:33760/heroku_app29129685';

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