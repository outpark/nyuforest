var Comment = require('../models/comment');
var Post = require('../models/post');
var async = require('async');

exports.list = function(req, res){
  Comment.find({post_id:req.params.post_id}, function(err, comments){
    if(err){
      return res.json({success:false, message:err});
    }else {
      res.json({
        success:true,
        data: comments
      });
    }
  });
};

exports.create = function(req, res){
  if(!req.body.content){
    return res.json({success:false,message:"Content required"});
  }else{
    Post.findById(req.params.post_id, function(err, post) {
      // console.log("finding" + req.params.id);
      if(err) {
        console.log(err);
        return res.json({
          success: false,
          message: "error occured"
        });
      } else if(!post) {
          return res.json({
            success: false,
            message: "no existing post"
          });
      } else {
        var comment = new Comment ({
          content: req.body.content,
          post_id: req.params.post_id,
          author: req.user.username
        });
        comment.save(function(err, comment){
          if(err){
            return res.json({
              success:false,
              message:"error occured while saving"
            });
          }else {
            post.comment_num++;
            post.comment_id.push(comment._id);
            post.save(function(err){
              if(err) {
                return res.json({
                  success:false,
                  message: 'failed to save comment'
                });
              } else {
                return res.json({
                  success: true,
                  data: comment,
                  message: "Successful"
                });
              }
            });
          }
        });
      }
    });
  }
};

//to be edited
exports.edit = function(req, res) {
  Comment.findByIdAndUpdate({post_id:req.params.post_id}, req.body.content, function(err, comment){
    if(err){
      return res.json({success:false, message:err});
    }else{
      res.json({success:true, message:comment._id+" has been updated"});
    }
  });
};

exports.delete = function(req, res){
  Comment.findByIdAndRemove({post_id:req.params.post_id}, function(err, post) {
    if(err){
      return res.json({success:false, message:err});
    }else {
      res.json({success:true, message:post._id+" has been deleted"});
    }
  });
};
