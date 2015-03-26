var mongoose = require('mongoose');
var mongoConnect = require('./mongoConnect');

var messageSchema = new mongoose.Schema(
  {
    bondId: String,
    person: Number,
    body: String
  },
  { collection: 'messages' }
);

var Message = mongoose.model('Message', messageSchema);
Message.connection = mongoose.connection;

module.exports = Message;
