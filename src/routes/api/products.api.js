const { Router } = require('express');
const passport = require('passport');
const ProductController = require('../../controllers/Product.controller');

const productController = new ProductController();

module.exports = (app) => {
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
