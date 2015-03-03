var mongoose = require('mongoose');
var mongoConnect = require('./mongoConnect');

var bondSchema = new mongoose.Schema(
  {
    name1: String,
    name2: String,
    phoneNumber1: String,
    phoneNumber2: String
  },
  { collection: 'bonds' }
);


module.exports = mongoose.model('Bond', bondSchema);
