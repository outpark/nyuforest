var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
//var colors = require('colors');
var Schema = mongoose.Schema;

var postSchema  = new Schema ({
  title: {type:String, required:true},
  body: {type:String, required:true},
  created_at:{type:Date, default:Date.now},
  updated_at: Date
});


var Post = mongoose.model('Post', postSchema);
module.exports = Post;
