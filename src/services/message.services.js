import MessageDao from '../dao/mongo/messageDao.js';

const MessageDaoManager = new MessageDao();

class MessageServices {
  async getMessages() {
    try {
      return await MessageDaoManager.getAll();
    } catch (error) {
      req.logger.info(error);
      return error;
    }
  }

  async addMessage(message) {
    try {
      return await MessageDaoManager.createOne(message);
    } catch (error) {
      req.logger.info(error);
      return error;
    }
  }
}
export default MessageServices;
