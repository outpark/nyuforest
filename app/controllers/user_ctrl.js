var User = require('../models/user');


String.prototype.isAlphaNumeric = function() {
  var regExp = /^[A-Za-z0-9]+$/;
  return (this.match(regExp));
};

exports.signup = function(req, res) {
  if(!req.body.email || !req.body.password || !req.body.username || !req.body.username.isAlphaNumeric()){
		return res.json({
			type:false,
			message:"invalid parameter"
		});
	} else{

    var newUser = new User({
        "email": req.body.email,
        "username": req.body.username,
        "password": req.body.password,
        "created_at": Date.now()
      });

      newUser.save(function(err, doc) {
       res.send(doc);
     });
  }
};

exports.signin = function(req, res) {
  if(!req.body.password || !req.body.username) {
    return res.json({
			type:false,
			message:"invalid parameter3"});
  } else {
    User.findOne({username:req.body.username}, function(err, user) {
      if(err) {
        return res.json({
    			type:false,
    			message:"invalid parameter1"});
      } else if(req.body.password == user.password){
        req.user = user;
        console.log("logged in");
        return res.send(user._id);

      }
    });

  }

};
