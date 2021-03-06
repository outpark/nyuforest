var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
//var colors = require('colors');
var Schema = mongoose.Schema;

var userSchema  = new Schema ({
  email: {type:String, unique:true, required:true},
  username: {type:String, unique:true, required:true},
  password: {type:String, required:true},
  created_at:{type:Date, default:Date.now},
  token: {type:String}
});


var User = mongoose.model('User', userSchema);
module.exports = User;
