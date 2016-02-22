var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var upSchema = new Schema({
	user_id: Schema.ObjectId,
	post_id: {type:Schema.ObjectId, ref:'Post'},
	created_at:{type:Date, default:Date.now}
});

var Up = mongoose.model('Up', upSchema);
module.exports = Up;
