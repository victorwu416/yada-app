var mongoose = require('mongoose');
var mongoConnect = require('./mongoConnect');

var ItemSchema = new mongoose.Schema(
  {
    bondId: String,
    description: String,
    status: String,
    assignee: Number
  },
  { collection: 'items' }
);

var Item = mongoose.model('Item', ItemSchema);
Item.connection = mongoose.connection;

module.exports = Item;
