const messageModel = require('./models/messages.model');
class UsersDao {
  async createOne(message) {
    try {
      return await messageModel.create(message);
    } catch (error) {
      console.log('error on UsersDao createOne:' + error);
    }
  }
  async getAll() {
    try {
      return await messageModel.find().sort({ $natural: -1 });
    } catch (error) {
      console.log('error on UsersDao getOne :' + error);
    }
  }
}
module.exports = UsersDao;
