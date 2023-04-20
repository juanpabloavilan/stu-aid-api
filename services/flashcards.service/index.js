const { models } = require("../../lib/sequelize");
const boom = require("@hapi/boom");

class FlashcardService {
  constructor() {}
  async isOwner(userLoggedId, courseId) {
    const isOwner = await models.Course.findOne({
      where: {
        id: courseId,
        userId: userLoggedId,
      },
    });
    return Boolean(isOwner);
  }
  async findById(id) {
    const flashcard = await models.Flashcard.findByPk(id);
    if (!flashcard) {
      throw boom.notFound("No se encontro flashcard con ese ID");
    }
    return flashcard;
  }
  async upsert(payload) {
    const [newFlashcard, isCreated] = await models.Flashcard.upsert(payload);
    return newFlashcard;
  }

  async delete(id) {
    const flashcard = await this.findById(id);
    const deletedFlashcard = flashcard.destroy({ returning: ["id"] });
    return deletedFlashcard;
  }
}

module.exports = FlashcardService;
