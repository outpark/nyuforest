var User = require('../models/user');
var jwt = require('jsonwebtoken');


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
    User.findOne({username: req.body.username}, function(err, user) {
      if (err) {
        res.json({
               type: false,
               message: "Error occured: " + err
           });
      }else{
        if (user) {
              res.json({
                  type: false,
                  message: "User already exists!"
              });
            }else{
                    var newUser = new User({
                          "email": req.body.email,
                          "username": req.body.username,
                          "password": req.body.password,
                          "created_at": Date.now()
                      });

                        newUser.save(function(err, user) {
                          if(err){
                    					console.log(err);
                    					return res.json({
                    						type:false,
                    						message:"error!"
                    					});
                    				}else {
                            user.token = jwt.sign(user.email+Date.now(), "tokengenerated");
                            user.save(function(err, user1) {
                              if(err){
                        					console.log(err);
                        					return res.json({
                        						type:false,
                        						message:"error!!!"
                        					});
                        				}
                                return res.json({
                                    type: true,
                                    username:user1.username,
						                        token:user1.token
                                });
                            });}

                            //  res.send(doc);
                     });
                   }
      }

    });
  }

};

exports.signin = function(req, res) {
  if(!req.body.password || !req.body.username) {
    return res.json({
			type:false,
			message:"invalid parameter1"});
  } else {
    User.findOne({username:req.body.username, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
              console.log(user.username);
               res.json({
                    type: true,
                    username: user.username,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect username or password"
                });
            }
        }
    });
    // User.findOne({username:req.body.username, password: req.body.password}, function(err, user) {
    //   if(err) {
    //     console.log(err);
    //     return res.json({
    // 			type:false,
    // 			message:"invalid parameter2"});
    //   } else {
    //     if(req.body.username === null){
    //       return res.json({
    //   			type:false,
    //   			message:"Wrong Password/Username"});
    //     } else if(req.body.password === user.password){
    //       req.user = user;
    //       console.log("logged in");
    //       return res.send(user._id);
    //     } else {
    //       res.json({
    //                 type: false,
    //                 data: "Incorrect username/password"
    //             });
    //     }
    //   }
    // });
  }
};

exports.me = function(req, res) {
  User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
          // console.log(user);
            res.json({
                type: true,
                data:{
                    username: user.username,
                    email: user.email,
                    token: user.token
                }
            });
        }
    });
};

exports.ensureAuthorized = function (req, res, next) {
    var bearerToken;
    var bearerHeader = req.get('Authorization');
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        User.findOne({token:bearerToken}, function(err, user){
          if(err) {
            res.send(403);
          } else if(user) {
            req.user = user;
  					next();
          } else {
            res.send(403);
          }
        });
    } else {
        res.send(403);
    }
};

exports.subscribeSchool = function (req, res) {
  if(!req.params.school || !req.body.username){
    return res.json({
      success:false,
      message:"Invalid parameters"
    });
  }
  async.waterfall([
    function(callback){
        User.update({username:req.body.username},{$push:{subscription:req.params.school}}, function(err, user){
          if(err){
            callback("Failed to update user with the username");
          }else{
            callback(null, user);
          }
        });
      }
  ], function(err, user) {
      if(err){
        return res.json({
          success:false,
          message:"Failed to subscribe" + err
        });
      }else {
        return res.json({
          success: true,
          data: user
        });
      }
  });
};
