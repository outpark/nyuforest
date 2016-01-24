var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
  content: {type:String, required:true},
  post_id: {type:Schema.ObjectId},
  author:{type:String, required:true},
  created_at:{type:Date, default:Date.now}
});

var Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
