var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var bond = require('./services/bond')(app);
var item = require('./services/item')(app);
var sms = require('./services/sms')(app);

app.listen(app.get('port'), function() {
  console.log("yada-app is running on port " + app.get('port'));
});
