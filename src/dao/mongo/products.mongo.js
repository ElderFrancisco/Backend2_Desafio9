import productModel from './models/products.model.js';

// export default class ProductsDao {
//   async paginate(params) {
//     try {
//       return await productModel.paginate(params.query, {
//         limit: params.limit,
//         page: params.page,
//         sort: params.sort,
//         lean: true,
//       });
//     } catch (error) {
//       req.logger.info(error);
//     }
//   }

//   async createOne(product) {
//     try {
//       return await productModel.create(product);
//     } catch (error) {
//       req.logger.info(error);
//     }
//   }

//   async get(query) {
//     try {
//       const product = await productModel.findOne(query).lean();
//       return product;
//     } catch (error) {
//       req.logger.info(error);
//     }
//   }

//   async updateOne(query, update) {
//     try {
//       return await productModel
//         .findOneAndUpdate(query, update, { new: true })
//         .lean();
//     } catch (error) {
//       req.logger.info(error);
//     }
//   }

//   async deleteOne(query) {
//     try {
//       return await productModel.deleteOne(query);
//     } catch (error) {
//       req.logger.info(error);
//     }
//   }

//   async getAll() {
//     try {
//       return await productModel.find().limit(100).sort({ createdAt: -1 });
//     } catch (error) {
//       req.logger.info(error);
//     }
//   }
// }

// import UserModel from './models/users.model.js';

export default class Product {
  get = async () => {
    return productModel.find();
  };
  create = async (data) => {
    return productModel.create(data);
  };
  getByID = async (id) => {
    return productModel.findById(id).lean();
  };
  update = async (data) => {
    return productModel.updateOne({ _id: data._id }, data);
  };
  paginate = async (params) => {
    return productModel.paginate(params.query, {
      limit: params.limit,
      page: params.page,
      sort: params.sort,
      lean: true,
    });
  };
  deleteByID = async (id) => {
    return productModel.deleteOne({ _id: id });
  };
}
