exports.index = function(req,res){
	return res.render('index');
};

exports.about = function(req,res){
	return res.render('about');
};

exports.board = function(req, res) {
	return res.render('board');
};

exports.register = function(req, res) {
	return res.render('register');
};

exports.user = function(req, res) {
	return res.render('user');
};
