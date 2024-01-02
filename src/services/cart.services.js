const CartsDao = require('../dao/mongo/cartsDao');
const UsersDao = require('../dao/mongo/usersDao');
const ProductsDao = require('../dao/mongo/productsDao');
const ticketsDao = require('../dao/mongo/ticketsDao');

const CartsDaoManager = new CartsDao();
const UsersDaoManager = new UsersDao();
const ProductsDaoManager = new ProductsDao();
const ticketsDaoManager = new ticketsDao();

async function procesarProductos(productsArray) {
  const productsNotProcessed = [];
  let precioTotal = 0;
  for (const p of productsArray) {
    try {
      console.log(p.product.title);
      console.log('stock del producto:');
      console.log(p.product.stock);
      console.log('cantidad pedida:');
      console.log(p.quantity);
      if (p.product.stock >= p.quantity) {
        const query = { _id: p.product._id };
        const newStock = p.product.stock - p.quantity;
        const body = { stock: newStock };
        await ProductsDaoManager.updateOne(query, body);
        const sumaTotalDeProducto = p.quantity * p.product.price;
        precioTotal += sumaTotalDeProducto;
      } else {
        productsNotProcessed.push(p.product._id);
      }

      // Tu lógica con el producto obtenido de la base de datos
    } catch (error) {
      console.log(error);
    }
  }
  return {
    total_price: precioTotal,
    failed_products: productsNotProcessed,
  };
}

function getUrl(params, path, number) {
  const nextPage = parseInt(params.page) + number;

  let url = `${path}?page=${nextPage >= 1 ? nextPage : 1}`;

  if (params.limit !== 10) {
    url += `&limit=${params.limit}`;
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

class CartServices {
  async createNewCart(products) {
    try {
      const cart = {
        products,
      };
      return await CartsDaoManager.createOne(cart);
    } catch (error) {
      console.log('Error on CartServices, createNewCart function: ' + error);
      return error;
    }
  }
  async getCartById(cid) {
    try {
      const query = { _id: cid };
      return await CartsDaoManager.getOne(query);
    } catch (error) {
      console.log('Error on CartServices, createNewCart function: ' + error);
      return error;
    }
  }
  async getCarts(params, pathUrl) {
    try {
      const urlPrev = getUrl(params, pathUrl, -1);
      const urlNext = getUrl(params, pathUrl, +1);
      const cartList = await CartsDaoManager.getAll(params);
      const result = createResult(cartList, 'success', urlPrev, urlNext);
      return result;
    } catch (error) {
      console.log('Error on ProductServices, getProducts function: ' + error);
      return error;
    }
  }

  async updateOneCart(cid, pid) {
    try {
      const query = { _id: cid };
      const cartToUpdate = await CartsDaoManager.getOne(query);
      if (!cartToUpdate) return null;
      const indexProduct = cartToUpdate.products.findIndex((product) => {
        return product.product._id == pid;
      });
      if (indexProduct >= 0) {
        cartToUpdate.products[indexProduct].quantity++;
      } else {
        cartToUpdate.products.push({ product: pid, quantity: 1 });
      }

      const result = CartsDaoManager.updateOne(query, cartToUpdate);
      return result;
    } catch (error) {
      console.log('Error on ProductServices, getProducts function: ' + error);
      return error;
    }
  }

  async deleteProductCart(cid, pid) {
    try {
      const query = { _id: cid };
      const cartToUpdate = await CartsDaoManager.getOne(query);
      if (!cartToUpdate) return null;
      const indexProduct = cartToUpdate.products.findIndex((product) => {
        return product.product._id == pid;
      });

      if (indexProduct >= 0) {
        if (cartToUpdate.products[indexProduct].quantity == 1) {
          cartToUpdate.products.splice(indexProduct, 1);
        } else cartToUpdate.products[indexProduct].quantity--;
      } else {
        return null;
      }
      const result = CartsDaoManager.updateOne(query, cartToUpdate);
      return result;
    } catch (error) {
      console.log('Error on ProductServices, getProducts function: ' + error);
      return error;
    }
  }

  async updateManyProducts(cid, products) {
    try {
      const query = { _id: cid };
      const cartToUpdate = await CartsDaoManager.getOne(query);
      if (!cartToUpdate) return null;
      products.forEach((productFull) => {
        const indexProduct = cartToUpdate.products.findIndex((product) => {
          return product.product._id == productFull.product;
        });
        if (indexProduct >= 0) {
          cartToUpdate.products[indexProduct].quantity += productFull.quantity;
        } else {
          let quantityOfProduct = 1;
          if (productFull.quantity !== null || productFull.quantity !== 0) {
            quantityOfProduct = productFull.quantity;
          }
          cartToUpdate.products.push({
            product: productFull.product,
            quantity: quantityOfProduct,
          });
        }
      });
      const result = CartsDaoManager.updateOne(query, cartToUpdate);
      return result;
    } catch (error) {
      console.log('Error on ProductServices, getProducts function: ' + error);
      return error;
    }
  }

  async emptyCartById(cid) {
    try {
      const query = { _id: cid };
      const cartToUpdate = await CartsDaoManager.getOne(query);
      if (!cartToUpdate) return null;
      cartToUpdate.products = [];

      const result = CartsDaoManager.updateOne(query, cartToUpdate);
      return result;
    } catch (error) {
      console.log('Error on ProductServices, getProducts function: ' + error);
      return error;
    }
  }

  async purchaseCart(cid) {
    try {
      const query = { cartId: cid };

      const user = await UsersDaoManager.getOne(query);
      if (!user) return null;
      const query2 = { _id: cid };
      const cartUser = await CartsDaoManager.getOne(query2);
      const productsArray = cartUser.products;
      const proceso = await procesarProductos(productsArray);
      console.log(proceso);
      if (proceso.failed_products.length > 0) {
        const productosFallidos = productsArray
          .filter((p) => proceso.failed_products.includes(p.product._id))
          .map((p) => ({
            product: p.product._id,
            quantity: p.quantity,
          }));
        cartUser.products = productosFallidos;
        const query3 = { _id: cartUser._id };
        await CartsDaoManager.updateOne(query3, cartUser);
      }
      const codigoAleatorio = Math.random().toString(36).substring(2, 8);
      const ticket = {
        code: codigoAleatorio,
        amount: proceso.total_price,
        purchaser: user.email,
      };

      const result = ticketsDaoManager.createOne(ticket);
      return result;
    } catch (error) {
      console.log('Error on ProductServices, getProducts function: ' + error);
      return error;
    }
  }
}
module.exports = CartServices;
