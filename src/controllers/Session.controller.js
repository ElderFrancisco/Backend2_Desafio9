class SessionController {
  async login(req, res) {
    try {
      if (!req.user) {
        return res
          .status(400)
          .send({ status: error, error: 'credenciales invalidas' });
      }
      return res.cookie('cookieJWT', req.user.token).redirect('/products');
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async register(req, res) {
    try {
      return res.redirect('/login');
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }
  async githubcallback(req, res) {
    try {
      return res.cookie('cookieJWT', req.user.token).redirect('/products');
    } catch (error) {
      onsole.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }
  async logout(req, res) {
    try {
      if (req.cookies['cookieJWT']) {
        // Elimina la cookie
        res.clearCookie('cookieJWT').status(200).redirect('/');
      } else {
        res.status(400).redirect('/login');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }
  async current(req, res) {
    try {
      return res.send({ status: 'Success', payload: req.user });
    } catch (error) {
      onsole.log(error);
      return res.status(500).json({ status: 'error' });
    }
  } /*

  async emptyCartById(req, res) {
    try {
      const cid = req.params.cid;
      const result = await CartServicesManager.emptyCartById(cid);
      if (!result) {
        return res
          .status(404)
          .json({ status: 'Error', Error: 'Cart Id not found' });
      }
      return res.status(201).json({ status: 'Success', payload: result });
    } catch (error) {
      onsole.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }

  async renderGetCartById(req, res) {
    try {
      const cid = req.params.cid;
      const result = await CartServicesManager.getCartById(cid);

      if (!result) {
        return res
          .status(404)
          .json({ status: 'error', error: 'Cart not found' });
      }
      return res.status(200).render('cartView', { cart: result });
    } catch (error) {
      console.log(error);
      return null;
    }
  }*/
}

module.exports = SessionController;
