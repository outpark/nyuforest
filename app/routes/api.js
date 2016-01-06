

var core_ctrl = require('../controllers/core_ctrl'),
  user_ctrl = require('../controllers/user_ctrl'),
  post_ctrl = require('../controllers/post_ctrl'),
  ensureAuthorized = require('../controllers/user_ctrl').ensureAuthorized;

exports.initApp = function(app){


  app.route('/partials/:page')
    .get(core_ctrl.pages);



  app.route('/api/users/signin')
  .post(user_ctrl.signin);

  app.route('/api/users/me')
  .get(ensureAuthorized, user_ctrl.me);

  app.route('/api/users/signup')
  .post(user_ctrl.signup);

  app.route('/api/posts')
  .get(post_ctrl.find)
  .post(ensureAuthorized, post_ctrl.create);

  app.route('/api/board/:category')
  .get(post_ctrl.find);

  app.route('/api/posts/:id')
  .get(post_ctrl.list)
  .put(post_ctrl.edit)
  .delete(post_ctrl.delete);

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
