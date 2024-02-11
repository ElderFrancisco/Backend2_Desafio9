import cartModel from './models/carts.model.js';

export default class CartsDao {
  async createOne(cart) {
    try {
      return await cartModel.create(cart);
    } catch (error) {
      req.logger.info(error);
    }
  }

  async getOne(query) {
    try {
      return await cartModel.findOne(query).populate('products.product').lean();
    } catch (error) {
      req.logger.info(error);
    }
  }

  async getAll(params) {
    try {
      return await cartModel.paginate(
        {},
        {
          limit: params.limit,
          page: params.page,
          lean: true,
        },
      );
    } catch (error) {
      req.logger.info(error);
    }
  }

  async updateOne(query, update) {
    try {
      return await cartModel.findOneAndUpdate(query, update, { new: true });
    } catch (error) {
      req.logger.info(error);
      return;
    }
  }
}
