
var Post = require('../models/post');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

exports.find = function(req, res) {
  var conditions = {};
  var PAGE_SIZE = 15;
  var next = Number(req.params.next_page);
  if(req.path.indexOf("/api/posts") > -1) {
    conditions = conditions;
  }else if(req.path.indexOf("/api/board") > -1){
    conditions = {category:req.params.category};
  }
  if(req.params.current_id && next >= 0){

  }else if(req.params.current_id && next < 0){

  }
      Post.find(conditions)
      .sort('-created_at')
      .limit(15)
      .exec(function(err, posts) {
        if(err){
          return res.json({success:false, message:err});
        } else {
          res.json({success:true, data:posts});
        }
      });
};

exports.best = function(req, res) {

      find({ups:{$gt:2}}).sort({_id:-1}).limit(7).exec(function(err, posts) {
        if(err){
          return res.json({success:false, message:err});
        } else {
          res.json({success:true, data:posts});
        }
      });
};


exports.create = function(req, res){
  if(!req.body.title || !req.body.content){
    res.json({
      success: false,
      message: "Invalid parameters"
    });
  }else {
    var post = new Post({
      title: req.body.title,
      body: req.body.content,
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
  Post.findById(req.params.post_id, function(err, post) {
    if(err) {
      return res.json({success:false, message:err});
    } else {
      res.json({success:true, data:post});
    }
  });
};

exports.edit = function(req, res) {
  req.body.post.updatedAt = Date.now();
  Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err, post) {
    if(err) {
      return res.json({success:false, message:err});
    } else {
      res.json({success:true, message:post._id+" has been updated"});
    }
  });
};

exports.delete = function(req, res) {
  Post.findByIdAndRemove(req.params.post_id, function(err, post) {
    if(err){
      return res.json({success:false, message:err});
    }else {
      res.json({success:true, message:post._id+" has been deleted"});
    }
  });
};
