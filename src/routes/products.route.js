import ProductController from '../controllers/Product.controller.js';
import { Router } from 'express';
import passport from 'passport';

const productController = new ProductController();

export default (app) => {
  let router = new Router();
  app.use('/products', router);

  router.get(
    '/',
    passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/login',
    }),
    productController.renderGetProducts,
  );

  router.get(
    '/:pid',
    passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/login',
    }),
    productController.renderGetProductById,
  );
};
