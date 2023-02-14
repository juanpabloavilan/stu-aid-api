const { where } = require("sequelize");
const { models } = require("../../lib/sequelize");
const boom = require("@hapi/boom");

/**
 * TODO: Complete route of post subject and validate that the given subject is from a course that belongs to the user logged in
 */
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
      },
    });

    if (!subject) throw boom.notFound;
    return subject;
  }

  async create(payload) {
    const newSubject = await models.Subject.create(payload);
    return newSubject;
  }
}

module.exports = SubjectService;
