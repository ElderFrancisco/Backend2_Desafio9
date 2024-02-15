import { Server } from 'socket.io';
import { MessageService } from '../repository';

export default (appServer) => {
  const io = new Server();

  io.on('connection', async (socket) => {
    console.log('Cliente conectado');
    logger.error('cliente conectado');

    socket.emit('Chat', await MessageService.get());

    socket.on('newChat', async (message) => {
      await MessageService.create(message);

      socket.emit('Chat', await MessageService.get());
    });
  });
};
