import messageModel from './models/messages.model.js';
class UsersDao {
  async createOne(message) {
    try {
      return await messageModel.create(message);
    } catch (error) {
      req.logger.info(error);
    }
  }
  async getAll() {
    try {
      return await messageModel.find().sort({ $natural: -1 });
    } catch (error) {
      req.logger.info(error);
    }
  }
}
export default UsersDao;
