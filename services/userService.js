const { UserRepository } = require("../repositories/userRepository");

class UserService {
  getUsers = () => UserRepository.getAll();
  getUser = (id) => this.search({ id });
  createUser = (user) => UserRepository.create(user);
  updateUser = (id, user) => UserRepository.update(id, user);
  deleteUser = (id) => UserRepository.delete(id);

  search(search) {
    const item = UserRepository.getOne(search);

    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService();
