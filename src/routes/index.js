 import webSocketRoute from './websocket.route.js';
import productsRoute from './products.route.js';
import cartsRoute from './cart.route.js';
import sessionRoute from './session.route.js';
// import mockingRoute from './mocking.route.js';
// import loggerRoute from './logger.route.js';

import cartsApi from './api/carts.api.js';
import productsApi from './api/products.api.js';
import sessionsApi from './api/sessions.api.js';

import { Router } from 'express';
const router = Router();



  router.use('/chat', webSocketRoute);
  router.use('/cart', cartsRoute);
  router.use('/products', productsRoute);
  router.use('/', sessionRoute);
  /*mockingRoute(router);
  loggerRoute(router);

  // API
  */
  router.use('/api/carts', cartsApi);
  router.use('/api/session', sessionsApi);

  router.use('/api/products', productsApi);


export default router;
