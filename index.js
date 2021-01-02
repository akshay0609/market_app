var express = require('express');
var app = express();
const dotenv = require('dotenv');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));

dotenv.config();

app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});