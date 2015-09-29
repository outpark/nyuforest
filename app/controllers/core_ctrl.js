exports.index = function(req,res){
	return res.sendFile('index.html', {root: './public/views'});
};

exports.pages = function(req,res){
	return res.sendFile(req.params.page, {root: './public/views/tpl/'});
};
//
// exports.home = function(req,res) {
// 	return res.sendFile('layout.html', {root: './public/views'});
// 	// return res.sendFile('index.html', {root: './public/views/tpl'});
// };
//
// exports.about = function(req,res){
// 	return res.sendFile('layout.html', {root: './public/views'});
// 	// return res.sendFile('about.html', {root: './public/views/tpl'});
// };
//
// exports.board = function(req, res) {
// 	return res.render('/tbl/board.html');
// };
//
// exports.register = function(req, res) {
// 	return res.render('/tbl/register.html');
// };
//
// exports.user = function(req, res) {
// 	return res.render('/tbl/user.html');
// };
