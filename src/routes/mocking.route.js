const { Router } = require('express');
const MockingController = require('../controllers/mocking.controller.js');

const mockingController = new MockingController();

module.exports = (app) => {
  let router = new Router();

  app.use('/mockingproducts', router);

  router.get('/', mockingController.mocking100products);

  router.get('/:number', mockingController.mocking100products);
};
