const { Router } = require('express');

module.exports = (app) => {
  let router = new Router();

  app.use('/chat', router);

  router.get('/', async (req, res) => {
    try {
      res.render('chat');
    } catch (error) {
      console.log(`[ERROR] -> ${error}`);
      res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
  });
};
