var express = require('express');
var url = require('url');
var path = require('path');
var app = express();
var dateParse = require('./app/dateParse.js');
var port = process.env.PORT || 3000;

//app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '/index.html')); 
});
app.get('/:query', function (req, res) {
  var query = req.params.query;
  res.send(JSON.stringify(dateParse.inputToOutput(query)));
  res.end();
});

app.listen(port, function () {
  console.log('Example app listening on port 8080!');
});