import userModel from './models/users.model.js';

export default class UsersDao {
  async createOne(User) {
    try {
      return await userModel.create(User);
    } catch (error) {
      req.logger.info(error);
    }
  }

  async getOne(query) {
    try {
      return await userModel.findOne(query).lean();
    } catch (error) {
      req.logger.info(error);
    }
  }
}
