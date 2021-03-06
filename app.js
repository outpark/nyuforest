var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var async = require('async');
var config = require('config.js');
var http = require('http');

//var User = require('./models/User');
var app = module.exports = express();
var port = process.env.PORT || 8080;



app.use(express.static(path.join(__dirname +'/public')));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

var mongoURL = config.database;
mongoose.connect(mongoURL);
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
  console.log("Server running on "+ port);
});
