const { models } = require("../../lib/sequelize");
const boom = require("@hapi/boom");
const { Sequelize } = require("sequelize");

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

  async answer(id, score) {
    const lastReviewed = new Date();
    const flashcard = await this.findById(id);
    const payload = {
      ...flashcard.dataValues,
      lastScore: score,
      lastReviewed: lastReviewed,
    };
    console.log(payload);
    const [updatedFlashcard, created] = await models.Flashcard.upsert(payload, {
      returning: true,
      fields: ["lastScore", "lastReviewed"],
    });
    return updatedFlashcard;
  }
}

module.exports = FlashcardService;
