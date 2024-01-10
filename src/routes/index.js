const webSocketRoute = require('./websocket.route');
const productsRoute = require('./products.route');
const cartsRoute = require('./cart.route');
const sessionRoute = require('./session.route');
const mockingRoute = require('./mocking.route');

const cartsApi = require('./api/carts.api');
const productsApi = require('./api/products.api');
const sessionsApi = require('./api/sessions.api');

module.exports = (app) => {
  webSocketRoute(app);
  productsRoute(app);
  cartsRoute(app);
  sessionRoute(app);
  mockingRoute(app);
  //api
  cartsApi(app);
  productsApi(app);
  sessionsApi(app);
};
