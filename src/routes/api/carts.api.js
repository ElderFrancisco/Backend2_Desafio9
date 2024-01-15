const { Router } = require('express');
const CartController = require('../../controllers/Cart.controller');
const passport = require('passport');

const cartController = new CartController();

module.exports = (app) => {
  let router = new Router();

  app.use('/api/carts', router);

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    cartController.createNewCart,
  );

  router.get(
    '/:cid',
    //passport.authenticate('jwt', { session: false }),
    cartController.getCartById,
  );

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    cartController.getCarts,
  );

  router.post(
    '/:cid/product/:pid',
    passport.authenticate('jwt', { session: false }),
    isUserMiddleware,
    cartController.updateOneCartByIdProduct,
  );

  router.delete(
    '/:cid/product/:pid',
    passport.authenticate('jwt', { session: false }),
    cartController.deleteProductById,
  );

  router.put(
    '/:cid',
    isUserMiddleware,
    passport.authenticate('jwt', { session: false }),
    cartController.updateManyProducts,
  );

  router.delete(
    '/:cid',
    passport.authenticate('jwt', { session: false }),
    cartController.emptyCartById,
  );

  router.get(
    '/:cid/purchase',
    passport.authenticate('jwt', { session: false }),
    cartController.purchaseCartById,
  );
};
const isUserMiddleware = (req, res, next) => {
  if (req.user && req.user.user.rol === 'user') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};
