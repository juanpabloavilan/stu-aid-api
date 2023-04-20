const { DataTypes } = require("sequelize");
const { USERS_TABLE_NAME, USERS_SCHEMA } = require("./user.model");
const { COURSES_TABLE_NAME, COURSES_SCHEMA } = require("./course.model");
const { SUBJECTS_TABLE_NAME, SUBJECTS_SCHEMA } = require("./subject.model");
const {
  FLASHCARDS_TABLE_NAME,
  FLASHCARDS_SCHEMA,
} = require("./flashcard.model");
const calculateNextSession = require("../../utils/study.session/nextSession");

async function setUpModels(sequelize) {
  const User = sequelize.define("User", USERS_SCHEMA, {
    sequelize,
    tableName: USERS_TABLE_NAME,
    timestamps: true,
  });
  const Course = sequelize.define("Course", COURSES_SCHEMA, {
    sequelize,
    tableName: COURSES_TABLE_NAME,
    timestamps: true,
  });
  const Subject = sequelize.define("Subject", SUBJECTS_SCHEMA, {
    sequelize,
    tableName: SUBJECTS_TABLE_NAME,
    timestamps: true,
  });
  const Flashcard = sequelize.define("Flashcard", FLASHCARDS_SCHEMA, {
    sequelize,
    tableName: FLASHCARDS_TABLE_NAME,
    timestamps: true,
    hooks: {
      afterUpsert: async ([flashcard, created], options) => {
        flashcard.nextRevision = calculateNextSession(
          flashcard.lastReviewed,
          flashcard.lastScore
        );
        console.log(
          "🚀 ~ file: index.js:38 ~ setUpModels ~ flashcard:",
          flashcard
        );
        await flashcard.save();
      },
    },
  });

  User.hasMany(Course, {
    as: "courses",
    foreignKey: "userId",
  });
  Course.belongsTo(User, {
    as: "user",
  });

  Course.hasMany(Subject, {
    as: "subjects",
    foreignKey: "courseId",
  });

  Subject.belongsTo(Course, {
    as: "course",
  });

  Subject.hasMany(Flashcard, {
    as: "flashcards",
    foreignKey: "subjectId",
  });

  Flashcard.belongsTo(Subject, {
    as: "subject",
  });

  console.log("modelos sincronizados con la db");
}

module.exports = { setUpModels };
