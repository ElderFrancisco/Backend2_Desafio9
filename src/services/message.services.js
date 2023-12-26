const MessageDao = require('../dao/mongo/messageDao');

const MessageDaoManager = new MessageDao();

class MessageServices {
  async getMessages() {
    try {
      const result = await MessageDaoManager.getAll();
      console.log(result);
      console.log('///////////');
      return result;
    } catch (error) {
      console.log('Error on MessageServices, getMessages function: ' + error);
      return error;
    }
  }

  async addMessage(message) {
    try {
      return await MessageDaoManager.createOne(message);
    } catch (error) {
      console.log('Error on MessageServices, addMessage function: ' + error);
      return error;
    }
  }
}

module.exports = MessageServices;
