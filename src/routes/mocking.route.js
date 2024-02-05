import { Router } from 'express';
import MockingController from '../controllers/mocking.controller.js';

const mockingController = new MockingController();

export default (app) => {
  let router = new Router();

  app.use('/mockingproducts', router);

  router.get('/', mockingController.mocking100products);

  router.get('/:number', mockingController.mocking100products);
};
