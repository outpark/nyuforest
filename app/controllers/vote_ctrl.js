var Post = require('../models/post');
var Up = require('../models/up');
var Down = require('../models/down');
var User = require('../models/user');
var async = require('async');

exports.upToggle = function(req,res){
  async.waterfall([
    function(callback){
      Post.findOne({
        _id:req.params.post_id
      }, function(err, post){
        if(err){
          return res.json({
            success:false,
            message:"error in finding the post."
          });
        }else if(!post){
          return res.json({
            success:false,
            message:"there is no post."
          });
        }else {
          callback(null, post);
        }
      });
    }
  ], function(err, post){
    var is_up = function(){
      if(req.user){
        if(post.up_user_id.indexOf(req.user.id)>=0){
          console.log("already liked.");
          return true;
        }else{
          console.log("not liked");
          return false;
        }
      }else{
        console.log("not logged in");
        return false;
      }
    };
    Up.findOne({
      user_id:req.user._id,
      post_id:req.params.post_id
    }, function(err, result){
      if(result){
        return res.json({
          success:true,
          message:"You already voted",
          data:{
            is_up:false,
            up_count: post.ups
          }
        });
        // result.remove(function(err){
        //   var up_count = post.ups;
        //   console.log("This many ups: "+up_count);
        //   if(up_count > 1){
        //     post.ups--;
        //     up_count = post.ups;
        //   }
        //   post.up_user_id.pull(req.user.id);
        //   post.save(function(err){
        //     if(err){
        //       return res.json({
        //         success:false,
        //         message:"failed to unlike"
        //       });
        //     }else{
        //       return res.json({
        //         success:true,
        //         message:"canceled",
        //         data:{
        //           is_up:is_up(),
        //           up_count:up_count
        //         }
        //       });
        //     }
        //   });
        // });
      }else{
        var up = new Up({
          post_id: req.params.post_id,
          user_id: req.user.id
        });
        up.save(function(err, updated){
          if(err){
            console.log("failed to save");
            return res.json({
              success:false,
              message:"failed to save"
            });
          } else {
              post.ups++;
              var up_count = post.ups;
              post.up_user_id.push(req.user.id);
              post.save(function(err){
                if(err){
                  return res.json({
                    success:false,
                    message:"failed to vote up"
                  });
                }else{
                  return res.json({
                    success:true,
                    message:"UP!!",
                    data:{
                      is_up:is_up(),
                      up_count:up_count
                    }
                  });
                }
              });
          }
        });
      }
    });
  });
};


exports.downToggle = function(req,res){
  async.waterfall([
    function(callback){
      Post.findOne({
        _id:req.params.post_id
      }, function(err, post){
        if(err){
          return res.json({
            success:false,
            message:"error in finding the post."
          });
        }else if(!post){
          return res.json({
            success:false,
            message:"there is no post."
          });
        }else {
          callback(null, post);
        }
      });
    }
  ], function(err, post){
    console.log("voting in process");
    var is_down = function(){
      console.log("is down is called");
      if(req.user){
        if(post.down_user_id.indexOf(req.user.id)>=0){
          console.log("already voted.");
          return true;
        }else{
          console.log("not voted");
          return false;
        }
      }else{
        console.log("not logged in");
        return false;
      }
      };
      Down.findOne({
        user_id:req.user._id,
        post_id:req.params.post_id
      }, function(err, result){
        console.log("finding down");
        if(result){
          return res.json({
            success:true,
            message:"You already voted",
            data:{
              is_down:false,
              down_count: post.downs
            }
          });
        }else{
          var down = new Down({
            post_id: req.params.post_id,
            user_id: req.user.id
          });
          console.log("trying to save");
          down.save(function(err, updated){
            if(err){
              console.log("failed to save");
              return res.json({
                success:false,
                message:"failed to save"
              });
            } else {
                post.downs--;
                var down_count = post.downs;
                post.down_user_id.push(req.user.id);
                post.save(function(err){
                  if(err){
                    return res.json({
                      success:false,
                      message:"failed to vote down"
                    });
                  }else{
                    return res.json({
                      success:true,
                      message:"DOWN!!",
                      data:{
                        is_down:is_down(),
                        down_count:down_count
                      }
                    });
                  }
                });
            }
          });
        }
      });
  });
};
