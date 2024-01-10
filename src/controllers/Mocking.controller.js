const MockingServices = require('../services/mocking.services');

const MockingServicesManager = new MockingServices();

class MockingController {
  async mocking100products(req, res) {
    try {
      const number = parseInt(req.params.number) || 100;
      const result = await MockingServicesManager.mockingProducts(number);
      return res.status(201).json({ status: 'OK', payload: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }
}

module.exports = MockingController;
