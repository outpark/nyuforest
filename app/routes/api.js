var core_ctrl = require('../controllers/core_ctrl'),
  user_ctrl = require('../controllers/user_ctrl');

exports.initApp = function(app){

  app.route('/')
  .get(core_ctrl.index);

  app.route('/about')
  .get(core_ctrl.about);

  app.route('/board')
  .get(core_ctrl.board);

  app.route('/register')
  .get(core_ctrl.register)
  .post(user_ctrl.signup);

  app.route('/user')
  .get(core_ctrl.user)
  .post(user_ctrl.signin);


};
