import {
  renderGetProducts,
  renderGetProductById,
} from '../controllers/Product.controller.js';

import { Router } from 'express';
import passport from 'passport';

export default (app) => {
  let router = new Router();
  app.use('/products', router);

  router.get(
    '/',
    passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/login',
    }),
    renderGetProducts,
  );

  router.get(
    '/:pid',
    passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/login',
    }),
    renderGetProductById,
  );
};
