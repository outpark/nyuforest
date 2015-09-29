var core_ctrl = require('../controllers/core_ctrl'),
  user_ctrl = require('../controllers/user_ctrl');

exports.initApp = function(app){


  app.route('/tpl/:page')
    .get(core_ctrl.pages);



  app.route('/api/user')
  .post(user_ctrl.signin);

  app.route('/api/register')
  .post(user_ctrl.signup);

  //
  // app.route('/about').get(core_ctrl.about);
  // app.route('/home').get(core_ctrl.home);
  //
  // app.route('/')
  // // .get(core_ctrl.index);
  //
  // app.route('/api/about')
  // .get(core_ctrl.about);
  //
  // app.route('/api/board')
  // .get(core_ctrl.board);
  //
  // app.route('/api/register')
  // // .get(core_ctrl.register)
  // .post(user_ctrl.signup);
  //
  // app.route('/api/user')
  // // .get(core_ctrl.user)
  // .post(user_ctrl.signin);
  //

  app.route('*')
  .get(core_ctrl.index);
};
