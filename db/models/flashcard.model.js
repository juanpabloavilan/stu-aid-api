const { DataTypes, Sequelize } = require("sequelize");
const { SUBJECTS_TABLE_NAME } = require("./subject.model");

const FLASHCARDS_TABLE_NAME = "flashcards";
const FLASHCARDS_SCHEMA = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  subjectId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SUBJECTS_TABLE_NAME,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  type: {
    allowNull: false,
    type: DataTypes.ENUM(["front-reverse", "true-false", "elaborated"]),
  },
  payload: {
    allowNull: false,
    type: DataTypes.JSONB,
  },
  status: {
    type: DataTypes.ENUM(["active", "unactive"]),
    defaultValue: "active",
  },
  lastReviewed: {
    allowNull: false,
    field: "last_reviewed",
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  lastScore: {
    allowNull: false,
    field: "last_score",
    type: DataTypes.DOUBLE,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
  nextRevision: {
    type: DataTypes.DATE,
    field: "next_revision",
  },
};

module.exports = { FLASHCARDS_TABLE_NAME, FLASHCARDS_SCHEMA };
