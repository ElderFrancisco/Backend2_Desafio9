import productModel from './models/products.model.js';

export default class ProductsDao {
  async getAllPaginate(params) {
    try {
      return await productModel.paginate(params.query, {
        limit: params.limit,
        page: params.page,
        sort: params.sort,
        lean: true,
      });
    } catch (error) {
      req.logger.info(error);
    }
  }

  async createOne(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      req.logger.info(error);
    }
  }

  async get(query) {
    try {
      const product = await productModel.findOne(query).lean();
      return product;
    } catch (error) {
      req.logger.info(error);
    }
  }

  async updateOne(query, update) {
    try {
      return await productModel
        .findOneAndUpdate(query, update, { new: true })
        .lean();
    } catch (error) {
      req.logger.info(error);
    }
  }

  async deleteOne(query) {
    try {
      return await productModel.deleteOne(query);
    } catch (error) {
      req.logger.info(error);
    }
  }

  async getAll() {
    try {
      return await productModel.find().limit(100).sort({ createdAt: -1 });
    } catch (error) {
      req.logger.info(error);
    }
  }
}
