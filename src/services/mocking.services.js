const generateProduct = require('../util/generateProduct');
const ProductsDao = require('../dao/mongo/productsDao');

const ProductsDaoManager = new ProductsDao();

class MockingServices {
  async mockingProducts(number) {
    try {
      for (let i = 0; i < number; i++) {
        const product = generateProduct();
        await ProductsDaoManager.createOne(product);
      }
      const productList = await ProductsDaoManager.getAll();
      return productList;
    } catch (error) {
      console.log('Error on MessageServices, getMessages function: ' + error);
      return error;
    }
  }
}

module.exports = MockingServices;
