import generateProduct from '../util/generateProduct.js';
import ProductsDao from '../dao/mongo/productsDao.js';

const ProductsDaoManager = new ProductsDao();

export default class MockingServices {
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
