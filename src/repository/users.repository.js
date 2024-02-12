import UserCreateDTO from '../DTO/users/users.dto.js';

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getByID = async (id) => {
    return this.dao.getByID(id);
  };
  getByCartID = async (id) => {
    return this.dao.getByQuery({ cartId: id });
  };
  getByEmail = async (email) => {
    return this.dao.getByQuery({ email: email });
  };
  create = async (data) => {
    const dataToInsert = new UserCreateDTO(data);
    return this.dao.create(dataToInsert);
  };
}
