import UsersDao from '../dao/mongo/usersDao.js';
const UsersDaoManager = new UsersDao();

class UserServices {
  async createNewUser(user) {
    try {
      return await UsersDaoManager.createOne(user);
    } catch (error) {
      req.logger.error(error);
      return error;
    }
  }

  async findOneByEmail(email) {
    try {
      const query = { email: email };
      const user = await UsersDaoManager.getOne(query);
      if (!user) {
        req.logger.silly('no found email');
        return null;
      }
      return user;
    } catch (error) {
      req.logger.error(error);
      return error;
    }
  }

  async findUserById(id) {
    try {
      const query = { _id: id };
      return await UsersDaoManager.getOne(query);
    } catch (error) {
      req.logger.error(error);
      return error;
    }
  }
}

export default UserServices;
