var mongoose = require('mongoose');
var mongoConnect = require('./mongoConnect');

var bondSchema = new mongoose.Schema(
  {
    name1: String,
    name2: String,
    phoneNumber1: String,
    phoneNumber2: String,
    smsTime1: Number,
    smsTime2: Number,
    lastSmsSent1: Date,
    lastSmsSent2: Date
  },
  { collection: 'bonds' }
);

var Bond = mongoose.model('Bond', bondSchema);
Bond.connection = mongoose.connection;

module.exports = Bond;
