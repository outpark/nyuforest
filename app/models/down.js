var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var downSchema = new Schema({
	user_id: Schema.ObjectId,
	post_id: {type:Schema.ObjectId, ref:'Post'},
	created_at:{type:Date, default:Date.now}
});

var Down = mongoose.model('Down', downSchema);
module.exports = Down;
