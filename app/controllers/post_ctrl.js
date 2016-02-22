
var async = require('async');
var Post = require('../models/post');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

exports.find = function(req, res) {
  var conditions = {};
  var sort = {_id:-1};
  var PAGE_SIZE = 15;
  var ups = 3;
  var skip;
  var next = req.params.next_page;
  if(req.path.indexOf("/api/posts") > -1) {
    conditions = conditions;
  }else if(req.path.indexOf("/api/board") > -1){
    conditions = {category:req.params.category};
  }
  if(req.params.current_id && next >= 0){
    console.log("tryna skip some pages1");
    conditions["_id"] = {$lte:req.params.current_id};
		skip = next * PAGE_SIZE;
  }else if(req.params.current_id && next < 0){
    console.log("tryna skip some pages1");
    conditions["_id"] = {$gt:req.params.current_id};
		skip = Math.abs(next * PAGE_SIZE) - PAGE_SIZE;
		sort = {_id:-1};
  }

  async.waterfall([
    function(callback){
      Post.find(conditions)
      .skip(skip)
      .limit(PAGE_SIZE)
      .sort(sort)
      .exec(function(err, posts) {
        if(err){
          return res.json({success:false, message:err});
        } else {
          callback(null, posts);
        }
      });
    },
    function(posts, callback){
      Post.find({_id:{$gt:posts[0]}})
				.count(function(err, postCount){
					if (err) {
						return res.status(500).json({
							type:false,
							message:"error while counting"
						});
					}else{
						var currentPage = ((postCount/PAGE_SIZE)+1).toFixed(0);
						callback(null, posts, currentPage);
					}
				});
    },
    function(posts, currentPage, callback){
      Post.find({}).count(function(err, totalCount){
        if(err){
          return res.json({success:false, message:err});
        }else{
          var totalPage = totalCount/PAGE_SIZE;
					if(totalCount % PAGE_SIZE){
						totalPage = Math.floor(totalPage + 1);
					}
          callback(null, posts, currentPage, totalPage);
        }
      });
    }
  ], function(err, posts, currentPage, totalPage){
    if(err){
      return res.json({success:false, message:err});
    }else{
      return res.json({
        success:true,
        data:posts,
        currentPage:Number(currentPage),
        totalPage:totalPage
      });
    }
  });
};

exports.best = function(req, res) {
      Post.find({ups:{$gt:3}}).sort({_id:-1}).limit(7).exec(function(err, posts) {
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
