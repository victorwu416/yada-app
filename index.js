var express = require('express');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/public')));


var bond = require('./services/bond')(app);


app.listen(app.get('port'), function() {
  console.log("yada-app is running at localhost:" + app.get('port'));
});
