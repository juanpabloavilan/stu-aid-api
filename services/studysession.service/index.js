const boom = require("@hapi/boom");
const { models } = require("../../lib/sequelize");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class StudySessionService {
  constructor() {}

  async subjectsNeedRevision(userId, query) {
    const options = {
      include: [
        {
          model: models.Course,
          as: "course",
          attributes: ["name", "userId"],
          where: {
            userId: userId,
          },
        },
        {
          model: models.Flashcard,
          as: "flashcards",
          attributes: ["id"],
          where: {
            nextRevision: {
              [Op.lte]: new Date(),
            },
          },
        },
      ],
    };
    const subjects = await models.Subject.findAll(options);
    // const subjectsNeedRevision = subjects.dataValues.map((subject) => {
    //   console.log("subject ----->", subject);
    //   return {
    //     ...subject,
    //     flashcardCount: subject.flashcards.length,
    //   };
    // });
    return subjects;
  }

  async today(userId, query) {
    const options = {
      where: {
        nextRevision: {
          [Op.lte]: new Date(),
        },
        userId: userId,
      },
      include: {
        model: models.Subject,
        as: "subject",
        where: {},
        include: {
          model: models.Course,
          as: "course",
          attributes: ["name", "userId", "id"],
          where: {
            userId: userId,
          },
        },
      },
      order: [["nextRevision"], ["lastScore", "DESC"]],
    };

    const { offset, limit } = query;

    if (limit && offset) {
      options.offset = offset;
      options.limit = limit;
    }

    const { subject } = query;
    if (subject) {
      options.include.where.id = subject;
    }

    const { course } = query;
    if (course) {
      options.include.where.courseId = course;
    }

    const flashcardsToReview = await models.Flashcard.findAll(options);

    return flashcardsToReview;
  }
}

module.exports = StudySessionService;
