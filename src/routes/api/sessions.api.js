const { Router } = require('express');
const passport = require('passport');
const SessionController = require('../../controllers/Session.controller');

const sessionController = new SessionController();

module.exports = (app) => {
  let router = new Router();

  app.use('/api/session', router);

  router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/authfailed' }),
    sessionController.login,
  ),
    router.post(
      '/register',
      passport.authenticate('register', { failureRedirect: '/authfailed' }),
      sessionController.register,
    ),
    router.get(
      '/login-github',
      passport.authenticate('github', { scope: ['user:email'] }),
    ),
    router.get(
      '/githubcallback',
      passport.authenticate('github', { failureRedirect: '/authfailed' }),
      sessionController.githubcallback,
    ),
    router.get(
      '/logout',
      passport.authenticate('jwt', {
        session: false,
        failureRedirect: '/login',
      }),
      sessionController.logout,
    );

  router.get(
    '/current',
    passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
    sessionController.current,
  );
};
