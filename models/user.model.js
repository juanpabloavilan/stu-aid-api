const { DataTypes, Sequelize } = require("sequelize");

const USERS_TABLE_NAME = "users";
const USERS_SCHEMA = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fullname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

module.exports = { USERS_TABLE_NAME, USERS_SCHEMA };
