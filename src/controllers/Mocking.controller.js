import MockingServices from '../services/mocking.services.js';

const MockingServicesManager = new MockingServices();

export default class MockingController {
  async mocking100products(req, res) {
    try {
      const number = parseInt(req.params.number) || 100;
      const result = await MockingServicesManager.mockingProducts(number);
      return res.status(201).json({ status: 'OK', payload: result });
    } catch (error) {
      req.logger.error(error);
      return res.status(500).json({ status: 'error' });
    }
  }
}
