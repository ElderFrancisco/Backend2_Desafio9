import CartServices from '../services/cart.services.js';
import { CartService } from '../repository/index.js';

const CartServicesManager = new CartServices();

function getQueryParams(req) {
  const p = req.query;
  const limit = parseInt(p.limit) || 10;
  const page = p.page || 1;
  const params = {
    limit,
    page,
  };
  return params;
}
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

export default class CartController {
  async createNewCart(req, res) {
    try {
      const productsBody = Array.isArray(req.body.products)
        ? req.body.products
        : [];
      const productMap = new Map();
      productsBody.forEach((product) => {
        if (product.product && product.quantity) {
          const { product: productId, quantity } = product;
          if (productMap.has(productId)) {
            // Si el producto ya está en el mapa, agregar la cantidad
            productMap.set(productId, productMap.get(productId) + quantity);
          } else {
            // Si es la primera vez que se encuentra el producto, agregarlo al mapa
            productMap.set(productId, quantity);
          }
        }
      });
      const products = [...productMap].map(([product, quantity]) => ({
        product,
        quantity,
      }));

      const cart = {
        products,
      };

      const result = await CartService.create(cart);
      if (!result) {
        req.logger.info('Cart not found');
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart Not Found' });
      }
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async getCartById(req, res) {
    try {
      const cid = req.params.cid;
      const result = await CartService.getByID(cid);
      if (!result) {
        req.logger.info('Cart not found');
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart Not Found' });
      }
      return res.status(200).json({ status: 'Success', payload: result });
    } catch (error) {
      req.logger.error(error);
      return null;
    }
  }

  async getCarts(req, res) {
    try {
      const pathUrl = getPathUrl(req);
      const params = getQueryParams(req);
      const result = await CartServicesManager.getCarts(params, pathUrl);
      return res.status(200).json(result);
    } catch (error) {
      req.logger.error(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async updateOneCartByIdProduct(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const result = await CartServicesManager.updateOneCart(cid, pid);
      if (!result) {
        req.logger.info('Cart not found');
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart Not Found' });
      }
      return res.status(201).json({ status: 'Success', payload: result });
    } catch (error) {
      req.logger.error(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async deleteProductById(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const result = await CartServicesManager.deleteProductCart(cid, pid);
      if (!result) {
        req.logger.info('Cart not found');
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart Not Found' });
      }
      return res.status(201).json({ status: 'Success', payload: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async updateManyProducts(req, res) {
    try {
      const cid = req.params.cid;
      const productsBody = Array.isArray(req.body.products)
        ? req.body.products
        : [];
      const productMap = new Map();
      productsBody.forEach((product) => {
        if (product.product && product.quantity) {
          const { product: productId, quantity } = product;
          if (productMap.has(productId)) {
            // Si el producto ya está en el mapa, agregar la cantidad
            productMap.set(productId, productMap.get(productId) + quantity);
          } else {
            // Si es la primera vez que se encuentra el producto, agregarlo al mapa
            productMap.set(productId, quantity);
          }
        }
      });
      const products = [...productMap].map(([product, quantity]) => ({
        product,
        quantity,
      }));

      const result = await CartServicesManager.updateManyProducts(
        cid,
        products,
      );
      if (!result) {
        req.logger.info('Cart not found');
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart Not Found' });
      }
      return res.status(201).json({ status: 'Success', payload: result });
    } catch (error) {
      req.logger.error(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async emptyCartById(req, res) {
    try {
      const cid = req.params.cid;
      const result = await CartService.emptyByID(cid);
      if (!result) {
        req.logger.info('Cart not found');
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart Not Found' });
      }
      return res.status(201).json({ status: 'Success', payload: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async renderGetCartById(req, res) {
    try {
      const cid = req.params.cid;
      const result = await CartServicesManager.getCartById(cid);

      if (!result) {
        req.logger.info('Cart not found');
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart Not Found' });
      }
      return res.status(200).render('cartView', { cart: result });
    } catch (error) {
      req.logger.error(error);
      return null;
    }
  }

  async purchaseCartById(req, res) {
    try {
      const cid = req.params.cid;
      const result = await CartServicesManager.purchaseCart(cid);

      return res.status(201).json({ status: 'Success', payload: result });
    } catch (error) {
      req.logger.error(error);
      return res.status(500).json({ status: 'error' });
    }
  }
}
