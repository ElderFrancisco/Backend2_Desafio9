import { Router } from 'express';
import SocketController from '../controllers/Socket.controller.js';
import passport from 'passport';

const socketController = new SocketController();

export default (app) => {
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
