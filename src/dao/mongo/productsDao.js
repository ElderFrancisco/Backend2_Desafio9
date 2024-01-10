const productModel = require('./models/products.model');
class ProductsDao {
  async getAllPaginate(params) {
    try {
      return await productModel.paginate(params.query, {
        limit: params.limit,
        page: params.page,
        sort: params.sort,
        lean: true,
      });
    } catch (error) {
      console.log('error on ProductsDao getAllPaginate');
    }
  }
  async createOne(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      console.log('error on ProductsDao createOne');
    }
  }
  async get(query) {
    try {
      return await productModel.findOne(query).lean();
    } catch (error) {
      console.log('error on ProductsDao get');
    }
  }

  async updateOne(query, update) {
    try {
      return await productModel
        .findOneAndUpdate(query, update, { new: true })
        .lean();
    } catch (error) {
      console.log('error on ProductsDao updateOne');
    }
  }
  async deleteOne(query) {
    try {
      return await productModel.deleteOne(query);
    } catch (error) {
      console.log('error on ProductsDao deleteOne');
    }
  }
  async getAll() {
    try {
      return await productModel.find().limit(100).sort({ createdAt: -1 });
    } catch (error) {
      console.log('error on ProductsDao getAll' + error);
    }
  }
}
module.exports = ProductsDao;
