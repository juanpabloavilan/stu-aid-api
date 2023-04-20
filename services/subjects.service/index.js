const { models } = require("../../lib/sequelize");
const boom = require("@hapi/boom");

class SubjectService {
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
    const subject = await models.Subject.findByPk(id, {
      include: {
        association: "flashcards",
        order: [["createdAt", "asc"]],
      },
    });

    if (!subject) {
      throw boom.notFound("No se encontro tema");
    }
    return subject;
  }

  async upsert(payload) {
    console.log(typeof payload.flashcards);
    const [newSubject, isCreated] = await models.Subject.upsert(payload);
    // const flashcards = await models.Flashcard.bulkCreate(payload.flashcards, {
    //   fields: ["subjectId", "id", "type", "payload"],
    //   updateOnDuplicate: ["id", "payload", "type", "status"],
    // });
    return { ...newSubject.dataValues };
  }

  async delete(id) {
    const subject = await this.findById(id);
    const deletedSubject = subject.destroy({ returning: ["id"] });
    return deletedSubject;
  }
}

module.exports = SubjectService;
