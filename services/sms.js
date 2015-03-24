var accountSid = 'AC12b8753775aa56a229fc318f03f82eea';
var authToken = '307fcf54cd3fa3ed76c862b026c71a10';
var client = require('twilio')(accountSid, authToken);

module.exports = function(app) {

  app.post('/api/sms', function (request, response) {
    client.sms.messages.create({
      body: request.body.body,
      to: request.body.phoneNumberTo,
      from: '+15039255863'
    }, function(error, data) {
      if (error) {
	    console.log('Error sending SMS to ' + request.body.phoneNumberTo);
        response.status(500).json({ error: 'Error sending SMS to ' + request.body.phoneNumberTo });
 	  } else {
        console.log('SMS sent from ' + data.from + ' to ' + data.to + ' with body: ' + data.body);
        response.json({ success: 'SMS sent from ' + data.from + ' to ' + data.to + ' with body: ' + data.body });
      }
    });
  });
};