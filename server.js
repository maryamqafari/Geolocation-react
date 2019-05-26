var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","DELETE,POST,GET,PUT");
  next();
})

app.use(bodyParser.json())
require('./server/routes/booking.routes.js')(app);


// Create a Server
var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App is listening at http://%s:%s", host, port)

})