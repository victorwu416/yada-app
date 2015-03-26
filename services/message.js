var Message = require('./models/Message');

module.exports = function(app) {

  app.get('/api/bonds/:id/messages', function (request, response) {
    var id = request.params.id;
    Message.find({ bondId: id }).sort({ _id: -1}).limit(10).exec(function (error, messages) {
      if (error) {
        console.log('Error getting Messages for Bond with id ' + id + ' from database: ' + error);
        response.status(500).json({ error: 'Error getting Messages for Bond with id ' + id + ' from database: ' + error });
      } else {
        response.json(messages);
      } 
    });
  });

  app.post('/api/messages', function (request, response) {
    var newMessage = new Message(request.body);
    newMessage.save(function (error, newMessage) {
      if (error) {
        console.log('Error inserting new Message into database: ' + error); 
        response.status(500).json({ error: 'Error inserting new Message into database: ' + error });
      } else {
        response.json(newMessage);
      }	
    });    
  });
};