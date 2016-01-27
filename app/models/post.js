var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
//var colors = require('colors');
var Schema = mongoose.Schema;

var postSchema  = new Schema ({
  title: {type:String, required:true},
  body: {type:String, required:true},
  created_at:{type:Date, default:Date.now},
  updated_at: Date,
  likes:{type:Number, default:0},
  comment_num:{type:Number, default:0},
	comment_id:[{type:Schema.ObjectId, ref:'Comment'}],
	image_id:[{type:Schema.ObjectId, ref:'Image'}],
  author: {type:String, required:true},
  category: {type:String, required:true}
});


var Post = mongoose.model('Post', postSchema);
module.exports = Post;
