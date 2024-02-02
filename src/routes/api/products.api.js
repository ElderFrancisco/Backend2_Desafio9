import { Router } from 'express';
import passport from 'passport';
import ProductController from '../../controllers/Product.controller.js';

const productController = new ProductController();

export default (app) => {
  let router = new Router();
  app.use('/api/products', router);

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    productController.getProducts,
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdminMiddleware,
    productController.addProduct,
  );

  router.get(
    '/:pid',
    passport.authenticate('jwt', { session: false }),
    productController.getProductById,
  );

  router.put(
    '/:pid',
    passport.authenticate('jwt', { session: false }),
    isAdminMiddleware,
    productController.updateProductById,
  );

  router.delete(
    '/:pid',
    passport.authenticate('jwt', { session: false }),
    isAdminMiddleware,
    productController.deleteProductById,
  );
};

const isAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.user.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};
