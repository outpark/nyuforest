
var Post = require('../models/post');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

exports.find = function(req, res) {
  var conditions = {};
  if(req.path.indexOf("/api/posts") > -1) {
    conditions = conditions;
  } else if(req.path.indexOf("/api/board") > -1){
    conditions = {category:req.params.category};
  }
      Post.find(conditions)
      .sort('-created_at')
      .exec(function(err, posts) {
        if(err){
          return res.json({success:false, message:err});
        } else {
          res.json({success:true, data:posts});
        }
      });
};

exports.create = function(req, res){
  if(!req.body.title || !req.body.body){
    res.json({
      type: false,
      message: "Invalid parameters"
    });
  }else {
    var post = new Post({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      author: req.user.username
    });
    Post.create(post, function(err, post) {
      if (err) {
        return res.json({success:false, message:err});
      } else {
        res.json({success:true, data:post});
      }
    });
  }



  // Post.create(req.body.post, function (err, post) {
  //   if (err) {
  //     return res.json({success:false, message:err});
  //   } else {
  //     res.json({success:true, data:post});
  //   }
  // });
};

exports.list = function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if(err) {
      return res.json({success:false, message:err});
    } else {
      res.json({success:true, data:post});
    }
  });
};

exports.edit = function(req, res) {
  req.body.post.updatedAt = Date.now();
  Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, post) {
    if(err) {
      return res.json({success:false, message:err});
    } else {
      res.json({success:true, message:post._id+" has been updated"});
    }
  });
};

exports.delete = function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err, post) {
    if(err){
      return res.json({success:false, message:err});
    }else {
      res.json({success:true, message:post._id+" has been deleted"});
    }
  });
};
