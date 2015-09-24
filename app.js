var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');
var http = require('http');

var User = require('./models/User');
var app = module.exports = express();
var port = process.env.PORT || 4000;

app.engine('ejs', engine);
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname +'/public')));
app.set('views', path.join(__dirname, '/public/views'));

mongoose.connect("mongodb://bamboodb:5769@ds051863.mongolab.com:51863/bamboo");
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

app.post('/register', function (req, res) {
  var newUser = new User({
    "email": req.body.email,
    "username": req.body.username,
    "password": req.body.password,
    "created_at": Date.now()
  });
   newUser.save(function(err, doc) {
     res.send(doc);
   });
});

app.listen(port, function() {
  console.log("Server running on 4000");
});
