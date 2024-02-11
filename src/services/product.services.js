import ProductsDao from '../DAO/mongo/products.mongo.js';
import { ProductService } from '../repository/index.js';

const ProductsDaoManager = new ProductsDao();

function getUrl(params, path, number) {
  const nextPage = parseInt(params.page) + number;

  let url = `${path}?page=${nextPage >= 1 ? nextPage : 1}`;
  if (params.limit !== 10) {
    url += `&limit=${params.limit}`;
  }
  if (params.query != null) {
    url += `&query=${JSON.stringify(params.query)}`;
  }
  if (params.sort != null) {
    url += `&sort=${JSON.stringify(params.sort)}`;
  }
  return url;
}

function createResult(doc, state, urlPrev, urlNext) {
  const result = {
    status: state,
    payload: doc.docs,
    totalPages: doc.totalPages,
    prevPage: doc.prevPage,
    nextPage: doc.nextPage,
    page: doc.page,
    hasPrevPage: doc.hasPrevPage,
    hasNextPage: doc.hasNextPage,
    prevLink: doc.hasPrevPage == true ? urlPrev : null,
    nextLink: doc.hasNextPage == true ? urlNext : null,
  };
  return result;
}

class ProductServices {
  async getProducts(params, pathUrl) {
    try {
      const urlPrev = getUrl(params, pathUrl, -1);
      const urlNext = getUrl(params, pathUrl, +1);
      //const productsList = await ProductsDaoManager.getAllPaginate(params);
      const productsList = await ProductService.paginate(params);
      const result = createResult(productsList, 'success', urlPrev, urlNext);
      return result;
    } catch (error) {
      req.logger.error(error);
      return error;
    }
  }

  async createProduct(product) {
    try {
      return await ProductsDaoManager.createOne(product);
    } catch (error) {
      req.logger.error(error);
      return error;
    }
  }

  // async findProductById(id) {
  //   try {
  //     console.log('AAAAAAAAAAAAAAAAAAAAA');
  //     const query = { _id: id };
  //     return await ProductService.get(query);
  //   } catch (error) {
  //     req.logger.error(error);
  //     return null;
  //   }
  // }

  async findByIdAndUpdate(id, body) {
    try {
      const query = { _id: id };

      return await ProductsDaoManager.updateOne(query, body);
    } catch (error) {
      req.logger.error(error);
      return error;
    }
  }

  async findByIdAndDelete(id) {
    try {
      const query = {};
      query['_id'] = id;
      return await ProductsDaoManager.deleteOne(query);
    } catch (error) {
      req.logger.error(error);
      return error;
    }
  }
}

export default ProductServices;
