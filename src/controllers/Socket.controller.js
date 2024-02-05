class SocketController {
  async chat(req, res) {
    try {
      res.render('chat');
    } catch (error) {
      req.logger.error(`[ERROR] -> ${error}`);
      res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
  }
}

export default SocketController;
