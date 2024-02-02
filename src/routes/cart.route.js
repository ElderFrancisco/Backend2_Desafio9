import CartController from '../controllers/Cart.controller.js';
import { Router } from 'express';

const cartController = new CartController();

export default (app) => {
  let router = new Router();

  app.use('/cart', router);

  router.get('/:cid', cartController.renderGetCartById);
};
