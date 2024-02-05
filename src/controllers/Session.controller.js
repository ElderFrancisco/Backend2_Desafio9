class SessionController {
  async login(req, res) {
    try {
      if (!req.user) {
        return res
          .status(400)
          .send({ status: 'error', error: 'credenciales invalidas' });
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
      console.log(error);
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
      console.log(error);
      return res.status(500).json({ status: 'error' });
    }
  }
}

export default SessionController;
