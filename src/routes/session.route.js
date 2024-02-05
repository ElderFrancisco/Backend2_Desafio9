import { Router } from 'express';
import passport from 'passport';
import { accessPublicWithoutAuth, authToHome } from '../util/jwt.js';

export default (app) => {
  let router = new Router();

  app.use('/', router);

  router.get('/', authToHome, async (req, res) => {
    try {
      const user = req.user;
      return res.render('index', { user: user });
    } catch (error) {
      req.logger.error(error);
    }
  });

  router.get('/register', accessPublicWithoutAuth, async (req, res) => {
    try {
      if (req.session?.user) {
        return res.redirect('/products');
      }
      return res.render('register', {});
    } catch (error) {
      req.logger.error(error);
    }
  });

  router.get('/login', accessPublicWithoutAuth, async (req, res) => {
    try {
      if (req.cookies['cookieJWT']) {
        return res.redirect('/products');
      }
      return res.render('login', {});
    } catch (error) {
      req.logger.error(error);
    }
  });

  router.get('/authfailed', async (req, res) => {
    try {
      if (req.session?.user) {
        return res.redirect('/');
      }
      return res.render('authfailed', {});
    } catch (error) {
      req.logger.error(error);
    }
  });

  router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      try {
        return res.send({ status: 'success', payload: req.user });
      } catch (error) {
        req.logger.error(error);
      }
    },
  );
};
