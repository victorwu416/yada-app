var mongoose = require('mongoose');

var localUriString = 'mongodb://localhost/yadaapp';

mongoose.connect(localUriString, function (error) {
  if (!error) {
    console.log('Successfully connected to: ' + localUriString);
  } else {
    console.log('Error connecting to: ' + localUriString + ': ' + error + ': '
                + 'Attempting to connect to MongoLab MongoDB');

    mongoose.connect(herokuUriString, function (error) {
      if (!error) {
        console.log('Successfully connected to MongoLab MongoDB');
      } else {
        console.log('Error connecting to MongoLab MongoDB: ' + error);
	  }
    });
  }
});
