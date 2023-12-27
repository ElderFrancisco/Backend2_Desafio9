const socketIO = require('socket.io');

const MessageServices = require('../services/message.services');
const messageServices = new MessageServices();

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    socket.emit('Chat', await messageServices.getMessages());

    socket.on('newChat', async (message) => {
      await messageServices.addMessage(message);

      socket.emit('Chat', await messageServices.getMessages());
    });
  });
};
