// import webSocketRoute from './websocket.route.js';
// import productsRoute from './products.route.js';
// import cartsRoute from './cart.route.js';
// import sessionRoute from './session.route.js';
// import mockingRoute from './mocking.route.js';
// import loggerRoute from './logger.route.js';

// import cartsApi from './api/carts.api.js';
import productsApi from './api/products.api.js';
// import sessionsApi from './api/sessions.api.js';

const setupRoutes = (app) => {
  /* webSocketRoute(app);
  productsRoute(app);
  cartsRoute(app);
  sessionRoute(app);
  mockingRoute(app);
  loggerRoute(app);

  // API
  cartsApi(app);*/
  productsApi(app);
  // sessionsApi(app);
};

export default setupRoutes;
