const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  getFighters = () => FighterRepository.getAll();
  getFighter = (id) => this.search({ id });
  createFighter = (user) => FighterRepository.create(user);
  updateFighter = (id, user) => FighterRepository.update(id, user);
  deleteFighter = (id) => FighterRepository.delete(id);

  search(search) {
    const fighterSearch = FighterRepository.getOne(search);

    if (!fighterSearch) {
      return null;
    }
    return fighterSearch;
  }
}

module.exports = new FighterService();
