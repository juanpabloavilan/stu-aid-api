const { DataTypes, Sequilize } = require("sequelize");
const { COURSES_TABLE_NAME } = require("./course.model");
const SUBJECTS_TABLE_NAME = "subjects";
const SUBJECTS_SCHEMA = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  courseId: {
    field: "course_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COURSES_TABLE_NAME,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: true,
    type: DataTypes.ENUM(["active", "unactive"]),
    defaultValue: "active",
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
};

module.exports = { SUBJECTS_SCHEMA, SUBJECTS_TABLE_NAME };
