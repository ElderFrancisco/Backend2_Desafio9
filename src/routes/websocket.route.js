const { Router } = require('express');
const SocketController = require('../controllers/Socket.controller');
const passport = require('passport');
const socketController = new SocketController();

module.exports = (app) => {
  let router = new Router();

  app.use('/chat', router);

  router.get(
    '/',
    passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
    isUserMiddleware,
    socketController.chat,
  );
};

const isUserMiddleware = (req, res, next) => {
  if (req.user && req.user.user.rol === 'user') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};
