import ProductServices from '../services/product.services.js';
import { ProductService } from '../repository/index.js';

// const allowedFields = [
//   'title',
//   'description',
//   'price',
//   'thumbnail',
//   'code',
//   'stock',
//   'category',
//   'status',
// ];

function getPathUrl(req) {
  const currentPath = req.originalUrl;
  const index = currentPath.indexOf('?');
  if (index !== -1) {
    const a = currentPath.substring(0, index);
    return a;
  } else {
    return currentPath;
  }
}

function getQueryParams(req) {
  const p = req.query;
  const limit = parseInt(p.limit) || 10;
  const page = p.page || 1;
  const pquery = p.query;
  const psort = p.sort;
  const query = (() => {
    try {
      return JSON.parse(pquery);
    } catch (error) {
      return null;
    }
  })();

  const sort = (() => {
    try {
      return JSON.parse(psort);
    } catch (error) {
      return null;
    }
  })();
  const params = {
    limit,
    page,
    query,
    sort,
  };
  return params;
}

// function getProductByBody(req) {
//   const body = req.body;
//   const title = body.title;
//   const description = body.description;
//   const price = body.price;
//   const thumbnail = Array.isArray(body.thumbnail) ? body.thumbnail : [];
//   const code = body.code;
//   const stock = body.stock;
//   const category = body.category;
//   const status = body.status === false ? false : true;
//   const productBody = {
//     title,
//     description,
//     price,
//     thumbnail,
//     code,
//     stock,
//     category,
//     status,
//   };
//   return productBody;
//}

const ProductServicesManager = new ProductServices();

// class ProductController {
export const getProducts = async (req, res) => {
  try {
    const pathUrl = getPathUrl(req);
    const params = getQueryParams(req);
    const result = await ProductServicesManager.getProducts(params, pathUrl);
    return res.status(200).json(result);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: 'error' });
  }
};
export const addProduct = async (req, res) => {
  try {
    const NewProduct = await ProductService.create(req.body);
    return res.status(201).json({ status: 'success', payload: NewProduct });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: 'error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const Id = req.params.pid;
    const productId = await ProductService.getByID(Id);
    if (productId == null) {
      req.logger.info('Product not found');
      return res
        .status(404)
        .json({ status: 'error', error: 'Product Not Found' });
    }
    return res.status(200).json({ status: 'success', payload: productId });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: 'error' });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const Id = req.params.pid;
    const body = req.body;
    const productToUpdate = await ProductService.getByID(Id);
    if (!productToUpdate) {
      req.logger.info('Product not found');
      return res
        .status(404)
        .json({ status: 'error', error: 'Product Not Found' });
    }
    body['_id'] = Id;
    const result = await ProductService.update(body);
    return res.status(201).json({ status: 'success', payload: result });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: 'error' });
  }
};
export const deleteProductById = async (req, res) => {
  try {
    const Id = req.params.pid;
    const result = await ProductService.getByID(Id);
    //Si el user es owner del product o es admin, elimine

    const productDelete = await ProductService.deleteByID(Id);
    if (productDelete.deletedCount === 1) {
      return res
        .status(204)
        .json({ status: 'Success', message: 'Product deleted successfully' });
    }
    req.logger.info('Product not found');
    return res
      .status(404)
      .json({ status: 'error', error: 'Product Not Found' });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: 'error' });
  }
};

export const renderGetProducts = async (req, res) => {
  try {
    const pathUrl = getPathUrl(req);
    const params = getQueryParams(req);
    //const { user } = req.user;
    const productList = await ProductServicesManager.getProducts(
      params,
      pathUrl,
    );
    if (productList.status == 'error') {
      return res.status(500).json({ status: 'error' });
    }
    return res
      .status(200)
      .render('products', { products: productList, user: {} });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: 'error' });
  }
};

export const renderGetProductById = async (req, res) => {
  try {
    const Id = req.params.pid;
    const product = await ProductService.getByID(Id);
    if (product == null) {
      return res
        .status(404)
        .json({ status: 'error', error: 'product not found' });
    }
    return res.status(200).render('productView', { product: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error' });
  }
};
