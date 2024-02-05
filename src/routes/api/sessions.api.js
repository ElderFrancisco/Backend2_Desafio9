import { Router } from 'express';
import passport from 'passport';
import SessionController from '../../controllers/Session.controller.js';

const sessionController = new SessionController();

export default (app) => {
  const router = Router();

  app.use('/api/session', router);

  router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/authfailed' }),
    sessionController.login,
  );

  router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/authfailed' }),
    sessionController.register,
  );

  router.get(
    '/login-github',
    passport.authenticate('github', { scope: ['user:email'] }),
  );

  router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/authfailed' }),
    sessionController.githubcallback,
  );

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
