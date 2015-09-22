var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var engine = require('ejs-mate');

mongoose.connect("mongodb://bamboodb:5769@ds051863.mongolab.com:51863/bamboo");
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB running");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

app.engine('ejs', engine);
app.set("view engine", 'ejs');

app.use(express.static(path.join(__dirname +'public')));

app.get('/', function (req, res) {
  res.render('index.ejs');
});
app.get('/about', function (req, res) {
  res.render('about.ejs');
});

app.get('/board', function (req, res) {
  res.render('board.ejs');
});

app.get('/register', function (req, res) {
  res.render('register.ejs');
});

app.listen(4000, function() {
  console.log("Server running on 4000");
});
