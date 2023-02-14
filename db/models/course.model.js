const { DataTypes, Sequelize } = require("sequelize");
const { USERS_TABLE_NAME } = require("./user.model");

const COURSES_TABLE_NAME = "courses";
const COURSES_SCHEMA = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: true,
    type: DataTypes.ENUM(["active", "dismissed"]),
    defaultValue: "active",
  },
  priority: {
    defaultValue: 1,
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING(510),
  },
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USERS_TABLE_NAME,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
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

module.exports = { COURSES_TABLE_NAME, COURSES_SCHEMA };
