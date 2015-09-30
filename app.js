var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var http = require('http');

//var User = require('./models/User');
var app = module.exports = express();
var port = process.env.PORT || 4000;



app.use(express.static(path.join(__dirname +'/public')));


mongoose.connect("mongodb://outpark:5769a@ds051873.mongolab.com:51873/rockandcode");
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB running");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//initializing routes
require('./app/routes/api').initApp(app);

app.listen(port, function() {
  console.log("Server running on 4000");
});
