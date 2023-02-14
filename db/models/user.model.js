const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

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
    set(value) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue("password", hash);
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
};

module.exports = { USERS_TABLE_NAME, USERS_SCHEMA };
